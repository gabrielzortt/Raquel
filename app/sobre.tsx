import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CabecalhoRLI from '../components/CabecalhoRLI';
import ImagemRLI from '../components/ImagemRLI';
import { corRLI, fonteRLI, gradienteRLI, sombraRLI, IconeRLI } from '../constants/temaRLI';

const infosRLI: { iconeRLI: IconeRLI; rotuloRLI: string; valorRLI: string }[] = [
  { iconeRLI: 'location-outline', rotuloRLI: 'Onde estamos', valorRLI: 'Loja virtual · Manaus, AM' },
  { iconeRLI: 'time-outline', rotuloRLI: 'Atendimento', valorRLI: 'Segunda a sexta, das 9h às 18h' },
  { iconeRLI: 'shield-checkmark-outline', rotuloRLI: 'Garantia', valorRLI: '12 meses de garantia e nota fiscal em todas as peças' },
  { iconeRLI: 'cube-outline', rotuloRLI: 'Envio', valorRLI: 'Embalagem protetora e frete grátis acima de R$ 300' },
];

export default function SobreRLI() {
  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <CabecalhoRLI tituloRLI="Sobre a loja" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 18 }}>
        <ImagemRLI iconeRLI="storefront-outline" legendaRLI="Foto da loja / logotipo" estiloRLI={{ width: '100%', height: 190, borderRadius: 26 }} />

        <LinearGradient colors={gradienteRLI.promoRLI} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={estilosRLI.cartaoEscuroRLI}>
          <Text style={estilosRLI.marcaRLI}>LUMINE</Text>
          <Text style={estilosRLI.tituloRLI}>Joias que pensam com você</Text>
          <Text style={estilosRLI.textoRLI}>
            A Lumine reúne joias tecnológicas e acessórios inteligentes: anéis, pulseiras, colares e relógios que unem design e tecnologia no dia a dia. Cada peça é escolhida para ser bonita, confortável e útil.
          </Text>
        </LinearGradient>

        <View style={estilosRLI.listaRLI}>
          {infosRLI.map((infoRLI, iRLI) => (
            <View key={infoRLI.rotuloRLI} style={[estilosRLI.infoRLI, iRLI < infosRLI.length - 1 && estilosRLI.infoBordaRLI]}>
              <View style={estilosRLI.infoIconeRLI}>
                <Ionicons name={infoRLI.iconeRLI} size={21} color={corRLI.ouroEscuroRLI} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilosRLI.infoRotuloRLI}>{infoRLI.rotuloRLI}</Text>
                <Text style={estilosRLI.infoValorRLI}>{infoRLI.valorRLI}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={estilosRLI.equipeRLI}>Desenvolvido por Paulo, Luiz e Gabriel</Text>
      </ScrollView>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  cartaoEscuroRLI: { borderRadius: 26, padding: 22 },
  marcaRLI: { fontSize: 11, letterSpacing: 3, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroClaroRLI },
  tituloRLI: { fontSize: 26, fontFamily: fonteRLI.tituloRLI, color: corRLI.brancoRLI, marginTop: 8 },
  textoRLI: { fontSize: 14, lineHeight: 22, fontFamily: fonteRLI.regularRLI, color: '#D6D0EC', marginTop: 10 },
  listaRLI: { backgroundColor: corRLI.brancoRLI, borderRadius: 22, paddingHorizontal: 6, ...sombraRLI.suaveRLI },
  infoRLI: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, paddingHorizontal: 12 },
  infoBordaRLI: { borderBottomWidth: 1, borderBottomColor: '#EEE9F8' },
  infoIconeRLI: { width: 42, height: 42, borderRadius: 14, backgroundColor: corRLI.cremeRLI, alignItems: 'center', justifyContent: 'center' },
  infoRotuloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  infoValorRLI: { fontSize: 14, fontFamily: fonteRLI.mediaRLI, color: corRLI.textoRLI, marginTop: 2 },
  equipeRLI: { textAlign: 'center', fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
});
