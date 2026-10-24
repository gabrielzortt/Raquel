import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImagemRLI from './ImagemRLI';
import { ProdutoRLI, formatarPrecoRLI } from '../data/produtosRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { corRLI, fonteRLI, sombraRLI } from '../constants/temaRLI';

interface ProductCardPropsRLI {
  produtoRLI: ProdutoRLI;
  aoAbrirRLI: (idRLI: string) => void;
}

export default function ProductCardRLI({ produtoRLI, aoAbrirRLI }: ProductCardPropsRLI) {
  const { favoritosRLI, alternarFavoritoRLI } = useLojaRLI();
  const favoritoRLI = favoritosRLI.includes(produtoRLI.idRLI);

  return (
    <Pressable style={({ pressed: pressedRLI }) => [estilosRLI.cartaoRLI, pressedRLI && { transform: [{ scale: 0.98 }] }]} onPress={() => aoAbrirRLI(produtoRLI.idRLI)}>
      <View>
        <ImagemRLI fonteRLI={produtoRLI.imagensRLI?.[0]} legendaRLI={`${produtoRLI.nomeRLI} – ${produtoRLI.subtituloRLI}`} estiloRLI={estilosRLI.imagemRLI} compactoRLI />
        <View style={estilosRLI.notaRLI}>
          <Ionicons name="star" size={11} color={corRLI.estrelaRLI} />
          <Text style={estilosRLI.notaTextoRLI}>{produtoRLI.notaRLI.toFixed(1)}</Text>
        </View>
        {produtoRLI.novoRLI ? (
          <View style={estilosRLI.novoRLI}>
            <Text style={estilosRLI.novoTextoRLI}>Novo</Text>
          </View>
        ) : null}
        <TouchableOpacity style={estilosRLI.coracaoRLI} onPress={() => alternarFavoritoRLI(produtoRLI.idRLI)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoRLI ? 'heart' : 'heart-outline'} size={16} color={favoritoRLI ? corRLI.erroRLI : corRLI.textoRLI} />
        </TouchableOpacity>
      </View>
      <Text style={estilosRLI.nomeRLI} numberOfLines={1}>{produtoRLI.nomeRLI}</Text>
      <Text style={estilosRLI.subtituloRLI} numberOfLines={1}>{produtoRLI.subtituloRLI}</Text>
      <View style={estilosRLI.rodapeRLI}>
        <Text style={estilosRLI.precoRLI}>{formatarPrecoRLI(produtoRLI.precoRLI)}</Text>
        <TouchableOpacity
          style={estilosRLI.botaoRLI}
          activeOpacity={0.85}
          onPress={() => aoAbrirRLI(produtoRLI.idRLI)}
          accessibilityLabel={`Ver detalhes de ${produtoRLI.nomeRLI}`}
        >
          <Ionicons name="add" size={20} color={corRLI.brancoRLI} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const estilosRLI = StyleSheet.create({
  cartaoRLI: { flex: 1, backgroundColor: corRLI.brancoRLI, borderRadius: 20, padding: 8, paddingBottom: 14, ...sombraRLI.suaveRLI },
  imagemRLI: { width: '100%', aspectRatio: 1, borderRadius: 18 },
  notaRLI: {
    position: 'absolute', bottom: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(20,18,43,0.62)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12,
  },
  novoRLI: { position: 'absolute', top: 8, left: 8, backgroundColor: corRLI.ouroRLI, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10 },
  novoTextoRLI: { color: corRLI.brancoRLI, fontSize: 10, fontFamily: fonteRLI.semiRLI },
  notaTextoRLI: { color: corRLI.brancoRLI, fontSize: 11, fontFamily: fonteRLI.semiRLI },
  coracaoRLI: { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.93)', alignItems: 'center', justifyContent: 'center' },
  nomeRLI: { fontSize: 16, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI, marginTop: 12, marginHorizontal: 6 },
  subtituloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 2, marginHorizontal: 6 },
  rodapeRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginHorizontal: 6 },
  precoRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.precoRLI },
  botaoRLI: { width: 34, height: 34, borderRadius: 11, backgroundColor: corRLI.cobreRLI, alignItems: 'center', justifyContent: 'center', shadowColor: corRLI.cobreRLI, shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
});
