import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoRLI from '../components/CabecalhoRLI';
import EstadoVazioRLI from '../components/EstadoVazio';
import { useLojaRLI } from '../context/LojaRLI';
import { formatarPrecoRLI } from '../data/produtosRLI';
import { corRLI, fonteRLI, sombraRLI } from '../constants/temaRLI';

export default function PedidosRLI() {
  const roteadorRLI = useRouter();
  const { pedidosRLI } = useLojaRLI();

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <CabecalhoRLI tituloRLI="Meus pedidos" />
      <FlatList
        data={pedidosRLI}
        keyExtractor={(pRLI) => pRLI.idRLI}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EstadoVazioRLI iconeRLI="receipt-outline" tituloRLI="Nenhum pedido ainda" textoRLI="Quando você finalizar uma compra, ela aparecerá aqui." botaoRLI="Explorar peças" aoPressionarRLI={() => roteadorRLI.replace('/inicio')} />}
        renderItem={({ item: itemRLI }) => (
          <View style={estilosRLI.cartaoRLI}>
            <View style={estilosRLI.topoRLI}>
              <View>
                <Text style={estilosRLI.numeroRLI}>Pedido #{itemRLI.idRLI}</Text>
                <Text style={estilosRLI.dataRLI}>{itemRLI.dataRLI} · {itemRLI.pagamentoRLI}</Text>
              </View>
              <View style={estilosRLI.statusRLI}>
                <Ionicons name="time-outline" size={13} color={corRLI.ouroEscuroRLI} />
                <Text style={estilosRLI.statusTextoRLI}>{itemRLI.statusRLI}</Text>
              </View>
            </View>
            {itemRLI.itensRLI.map((iRLI) => (
              <Text key={`${iRLI.produtoRLI.idRLI}-${iRLI.tamanhoRLI}`} style={estilosRLI.itemRLI}>
                {iRLI.quantidadeRLI}x {iRLI.produtoRLI.nomeRLI} ({iRLI.tamanhoRLI})
              </Text>
            ))}
            <View style={estilosRLI.rodapeRLI}>
              <Text style={estilosRLI.totalRotuloRLI}>Total</Text>
              <Text style={estilosRLI.totalRLI}>{formatarPrecoRLI(itemRLI.totalRLI)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  cartaoRLI: { backgroundColor: corRLI.brancoRLI, borderRadius: 22, padding: 16, gap: 8, marginBottom: 14, ...sombraRLI.suaveRLI },
  topoRLI: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  numeroRLI: { fontSize: 18, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  dataRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 2 },
  statusRLI: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: corRLI.cremeRLI, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  statusTextoRLI: { fontSize: 11, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroEscuroRLI },
  itemRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: '#5C4D45' },
  rodapeRLI: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: corRLI.bordaRLI, paddingTop: 12, marginTop: 6 },
  totalRotuloRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  totalRLI: { fontSize: 18, fontFamily: fonteRLI.tituloRLI, color: corRLI.ouroEscuroRLI },
});
