import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoRLI from '../components/CabecalhoRLI';
import { corRLI, fonteRLI, sombraRLI, IconeRLI } from '../constants/temaRLI';

const avisosRLI: { idRLI: string; tituloRLI: string; textoRLI: string; tempoRLI: string; iconeRLI: IconeRLI; novoRLI: boolean }[] = [
  { idRLI: '1', tituloRLI: 'Chegou o Anel Spark', textoRLI: 'O anel que avisa mensagens com uma luz discreta já está disponível.', tempoRLI: 'Há 2 h', iconeRLI: 'sparkles-outline', novoRLI: true },
  { idRLI: '2', tituloRLI: 'Cupom BRILHO10', textoRLI: 'Use no carrinho e ganhe 10% de desconto na sua compra.', tempoRLI: 'Hoje', iconeRLI: 'pricetag-outline', novoRLI: true },
  { idRLI: '3', tituloRLI: 'Frete grátis', textoRLI: 'Compras acima de R$ 300,00 não pagam frete.', tempoRLI: 'Ontem', iconeRLI: 'cube-outline', novoRLI: false },
  { idRLI: '4', tituloRLI: 'Dica de uso', textoRLI: 'Veja como carregar a Pulseira Aura e fazer a bateria durar mais.', tempoRLI: '2 dias', iconeRLI: 'bulb-outline', novoRLI: false },
];

export default function NotificacoesRLI() {
  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <CabecalhoRLI tituloRLI="Notificações" />
      <FlatList
        data={avisosRLI}
        keyExtractor={(avisoRLI) => avisoRLI.idRLI}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: itemRLI }) => (
          <View style={estilosRLI.itemRLI}>
            <View style={estilosRLI.iconeRLI}>
              <Ionicons name={itemRLI.iconeRLI} size={22} color={corRLI.brancoRLI} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={estilosRLI.linhaRLI}>
                <Text style={estilosRLI.itemTituloRLI}>{itemRLI.tituloRLI}</Text>
                {itemRLI.novoRLI && <View style={estilosRLI.pontoRLI} />}
              </View>
              <Text style={estilosRLI.textoRLI}>{itemRLI.textoRLI}</Text>
              <Text style={estilosRLI.tempoRLI}>{itemRLI.tempoRLI}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  itemRLI: { flexDirection: 'row', gap: 14, backgroundColor: corRLI.brancoRLI, borderRadius: 20, padding: 14, marginBottom: 12, ...sombraRLI.suaveRLI },
  iconeRLI: { width: 46, height: 46, borderRadius: 23, backgroundColor: corRLI.cobreRLI, alignItems: 'center', justifyContent: 'center' },
  linhaRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemTituloRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  pontoRLI: { width: 9, height: 9, borderRadius: 5, backgroundColor: corRLI.ouroRLI },
  textoRLI: { fontSize: 13, lineHeight: 19, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 3 },
  tempoRLI: { fontSize: 11, fontFamily: fonteRLI.mediaRLI, color: '#B4B0C6', marginTop: 6 },
});
