import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListRLI from '../../components/ProductList';
import EstadoVazioRLI from '../../components/EstadoVazio';
import { produtosRLI } from '../../data/produtosRLI';
import { useLojaRLI } from '../../context/LojaRLI';
import { corRLI, fonteRLI } from '../../constants/temaRLI';

export default function FavoritosRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { favoritosRLI } = useLojaRLI();
  const listaRLI = produtosRLI.filter((pRLI) => favoritosRLI.includes(pRLI.idRLI));

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsRLI.top + 16, paddingHorizontal: 20, paddingBottom: 18 }}>
        <Text style={estilosRLI.tituloRLI}>Favoritos</Text>
        <Text style={estilosRLI.subtituloRLI}>{listaRLI.length} {listaRLI.length === 1 ? 'peça salva' : 'peças salvas'}</Text>
      </View>
      <ProductListRLI
        produtosRLI={listaRLI}
        aoAbrirRLI={(idRLI) => roteadorRLI.push({ pathname: '/produto/[id]', params: { id: idRLI } })}
        vazioRLI={<EstadoVazioRLI iconeRLI="heart-outline" tituloRLI="Nenhum favorito ainda" textoRLI="Toque no coração de uma peça para guardá-la aqui." botaoRLI="Explorar peças" aoPressionarRLI={() => roteadorRLI.push('/inicio')} />}
      />
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  tituloRLI: { fontSize: 30, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  subtituloRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 2 },
});
