import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemRLI from '../../components/ImagemRLI';
import BotaoRLI from '../../components/BotaoRLI';
import EstadoVazioRLI from '../../components/EstadoVazio';
import {
  TamanhoRLI, buscarProdutoPorIdRLI, formatarAvaliacoesRLI, formatarPrecoRLI, tamanhosRLI, nomeTamanhoRLI,
} from '../../data/produtosRLI';
import { useLojaRLI } from '../../context/LojaRLI';
import { corRLI, fonteRLI, sombraRLI, IconeRLI } from '../../constants/temaRLI';

const limiteDescricaoRLI: number = 110;

export default function DetalhesRLI() {
  const { id: idRLI } = useLocalSearchParams<{ id: string }>();
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { width: larguraRLI } = useWindowDimensions();
  const { favoritosRLI, alternarFavoritoRLI, adicionarRLI, mostrarToastRLI } = useLojaRLI();
  const [tamanhoRLI, setTamanhoRLI] = useState<TamanhoRLI>('M');
  const [expandidaRLI, setExpandidaRLI] = useState<boolean>(false);
  const produtoRLI = buscarProdutoPorIdRLI(idRLI ?? '');

  if (!produtoRLI) {
    return (
      <View style={estilosRLI.telaRLI}>
        <EstadoVazioRLI iconeRLI="alert-circle-outline" tituloRLI="Peça não encontrada" textoRLI="Esse item não está mais disponível." botaoRLI="Voltar" aoPressionarRLI={() => roteadorRLI.back()} />
      </View>
    );
  }

  const favoritoRLI = favoritosRLI.includes(produtoRLI.idRLI);
  const precoRLI = produtoRLI.precoRLI;
  const diametroRLI = Math.min(larguraRLI - 40, 420);

  const fichaRLI: { rotuloRLI: string; valorRLI: string; iconeRLI: IconeRLI }[] = [
    { rotuloRLI: 'Material', valorRLI: produtoRLI.materialRLI, iconeRLI: 'diamond-outline' },
    { rotuloRLI: 'Conexão', valorRLI: produtoRLI.conexaoRLI, iconeRLI: 'bluetooth-outline' },
    { rotuloRLI: 'Bateria', valorRLI: produtoRLI.bateriaRLI, iconeRLI: 'battery-charging-outline' },
    { rotuloRLI: 'Garantia', valorRLI: produtoRLI.garantiaRLI, iconeRLI: 'shield-checkmark-outline' },
  ];

  const adicionarAoCarrinhoRLI = () => {
    adicionarRLI(produtoRLI, tamanhoRLI, 1);
    mostrarToastRLI(`${produtoRLI.nomeRLI} adicionado ao carrinho`);
  };

  const comprarAgoraRLI = () => {
    adicionarRLI(produtoRLI, tamanhoRLI, 1);
    roteadorRLI.push('/checkout');
  };

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ paddingTop: insetsRLI.top + 60, alignItems: 'center' }}>
          <ImagemRLI
            fonteRLI={produtoRLI.imagensRLI?.[0]}
            iconeRLI="image-outline"
            legendaRLI={`${produtoRLI.nomeRLI} – ${produtoRLI.subtituloRLI}`}
            estiloRLI={{ width: diametroRLI, height: diametroRLI * 0.9, borderRadius: 36 }}
          />
        </View>
        <TouchableOpacity style={[estilosRLI.iconeTopoRLI, { top: insetsRLI.top + 12, left: 20 }]} onPress={() => (roteadorRLI.canGoBack() ? roteadorRLI.back() : roteadorRLI.replace('/inicio'))} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={24} color={corRLI.textoRLI} />
        </TouchableOpacity>
        <TouchableOpacity style={[estilosRLI.iconeTopoRLI, { top: insetsRLI.top + 12, right: 20 }]} onPress={() => alternarFavoritoRLI(produtoRLI.idRLI)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoRLI ? 'heart' : 'heart-outline'} size={24} color={favoritoRLI ? corRLI.erroRLI : corRLI.textoRLI} />
        </TouchableOpacity>

        <View style={estilosRLI.corpoRLI}>
          <View style={estilosRLI.linhaTituloRLI}>
            <View style={{ flex: 1 }}>
              <Text style={estilosRLI.nomeRLI}>{produtoRLI.nomeRLI}</Text>
              <Text style={estilosRLI.subtituloRLI}>{produtoRLI.subtituloRLI}</Text>
            </View>
            <View style={estilosRLI.notaLinhaRLI}>
              <Ionicons name="star" size={22} color={corRLI.ouroRLI} />
              <Text style={estilosRLI.notaRLI}>{produtoRLI.notaRLI.toFixed(1)}</Text>
              <Text style={estilosRLI.avaliacoesRLI}>({formatarAvaliacoesRLI(produtoRLI.avaliacoesRLI)})</Text>
            </View>
          </View>

          <View style={estilosRLI.divisorRLI} />

          <Text style={estilosRLI.secaoRLI}>Descrição</Text>
          <Text style={estilosRLI.descricaoRLI}>
            {expandidaRLI ? produtoRLI.descricaoRLI : `${produtoRLI.descricaoRLI.slice(0, limiteDescricaoRLI)}.. `}
            <Text style={estilosRLI.lerMaisRLI} onPress={() => setExpandidaRLI(!expandidaRLI)}>
              {expandidaRLI ? ' Ler menos' : 'Ler mais'}
            </Text>
          </Text>

          <View style={estilosRLI.fichaRLI}>
            {fichaRLI.map((fRLI) => (
              <View key={fRLI.rotuloRLI} style={estilosRLI.fichaItemRLI}>
                <Ionicons name={fRLI.iconeRLI} size={18} color={corRLI.ouroRLI} />
                <Text style={estilosRLI.fichaRotuloRLI}>{fRLI.rotuloRLI}</Text>
                <Text style={estilosRLI.fichaValorRLI} numberOfLines={1}>{fRLI.valorRLI}</Text>
              </View>
            ))}
          </View>

          <Text style={[estilosRLI.secaoRLI, { marginTop: 24 }]}>Tamanho</Text>
          <View style={estilosRLI.tamanhosRLI}>
            {tamanhosRLI.map((gRLI) => {
              const ativoRLI = gRLI === tamanhoRLI;
              return (
                <TouchableOpacity key={gRLI} activeOpacity={0.85} onPress={() => setTamanhoRLI(gRLI)} style={[estilosRLI.tamanhoRLI, ativoRLI && estilosRLI.tamanhoAtivoRLI]}>
                  <Text style={[estilosRLI.tamanhoTextoRLI, ativoRLI && estilosRLI.tamanhoTextoAtivoRLI]}>{gRLI}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={estilosRLI.tamanhoLegendaRLI}>{nomeTamanhoRLI[tamanhoRLI]}</Text>
        </View>
      </ScrollView>

      <View style={[estilosRLI.rodapeRLI, { paddingBottom: Math.max(insetsRLI.bottom, 16) }]}>
        <View>
          <Text style={estilosRLI.precoRotuloRLI}>Preço</Text>
          <Text style={estilosRLI.precoRLI}>{formatarPrecoRLI(precoRLI)}</Text>
        </View>
        <TouchableOpacity style={estilosRLI.carrinhoBotaoRLI} onPress={adicionarAoCarrinhoRLI} accessibilityLabel="Adicionar ao carrinho">
          <Ionicons name="bag-add-outline" size={24} color={corRLI.ouroRLI} />
        </TouchableOpacity>
        <BotaoRLI tituloRLI="Buy Now" aoPressionarRLI={comprarAgoraRLI} alturaRLI={56} estiloRLI={{ flex: 1 }} />
      </View>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.brancoRLI },
  iconeTopoRLI: { position: 'absolute', width: 42, height: 42, borderRadius: 14, backgroundColor: corRLI.brancoRLI, alignItems: 'center', justifyContent: 'center', ...sombraRLI.suaveRLI },
  corpoRLI: { paddingHorizontal: 20, marginTop: 26 },
  linhaTituloRLI: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nomeRLI: { fontSize: 24, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  subtituloRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 6 },
  notaLinhaRLI: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  notaRLI: { fontSize: 20, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  avaliacoesRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  divisorRLI: { height: 1, backgroundColor: '#EDEDED', marginVertical: 18 },
  secaoRLI: { fontSize: 16, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  descricaoRLI: { fontSize: 14, lineHeight: 25, fontFamily: fonteRLI.regularRLI, color: '#5A5A5A', marginTop: 12 },
  lerMaisRLI: { fontFamily: fonteRLI.semiRLI, color: corRLI.ouroRLI },
  fichaRLI: { flexDirection: 'row', gap: 10, marginTop: 18 },
  fichaItemRLI: { flex: 1, alignItems: 'center', gap: 4, backgroundColor: corRLI.fundoRLI, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 4 },
  fichaRotuloRLI: { fontSize: 10, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  fichaValorRLI: { fontSize: 11, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  tamanhosRLI: { flexDirection: 'row', gap: 16, marginTop: 14 },
  tamanhoRLI: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#E6E6E6', backgroundColor: corRLI.brancoRLI, alignItems: 'center', justifyContent: 'center' },
  tamanhoAtivoRLI: { borderColor: corRLI.ouroRLI, backgroundColor: corRLI.cremeRLI },
  tamanhoTextoRLI: { fontSize: 15, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
  tamanhoTextoAtivoRLI: { fontFamily: fonteRLI.semiRLI, color: corRLI.ouroRLI },
  tamanhoLegendaRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 8, textAlign: 'center' },
  rodapeRLI: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corRLI.brancoRLI },
  precoRotuloRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  precoRLI: { fontSize: 20, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroRLI, marginTop: 2 },
  carrinhoBotaoRLI: { width: 56, height: 56, borderRadius: 28, borderWidth: 1.5, borderColor: corRLI.ouroRLI, alignItems: 'center', justifyContent: 'center' },
});
