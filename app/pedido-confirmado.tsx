import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoRLI from '../components/BotaoRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { formatarPrecoRLI } from '../data/produtosRLI';
import { corRLI, fonteRLI, gradienteRLI } from '../constants/temaRLI';

export default function PedidoConfirmadoRLI() {
  const { id: idRLI } = useLocalSearchParams<{ id: string }>();
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { pedidosRLI } = useLojaRLI();
  const escalaRLI = useRef(new Animated.Value(0)).current;
  const opacidadeRLI = useRef(new Animated.Value(0)).current;
  const pedidoRLI = pedidosRLI.find((pRLI) => pRLI.idRLI === idRLI);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(escalaRLI, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(opacidadeRLI, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
  }, [escalaRLI, opacidadeRLI]);

  return (
    <LinearGradient colors={gradienteRLI.escuroVertRLI} style={[estilosRLI.telaRLI, { paddingTop: insetsRLI.top + 40, paddingBottom: Math.max(insetsRLI.bottom, 20) + 12 }]}>
      <StatusBar style="light" />
      <View style={estilosRLI.centroRLI}>
        <Animated.View style={[estilosRLI.seloRLI, { transform: [{ scale: escalaRLI }] }]}>
          <Ionicons name="checkmark" size={64} color={corRLI.brancoRLI} />
        </Animated.View>
        <Animated.View style={{ opacity: opacidadeRLI, alignItems: 'center' }}>
          <Text style={estilosRLI.tituloRLI}>Pedido realizado!</Text>
          <Text style={estilosRLI.textoRLI}>Obrigado pela compra. Você receberá as atualizações do envio por aqui.</Text>

          <View style={estilosRLI.cartaoRLI}>
            <View style={estilosRLI.linhaRLI}>
              <Text style={estilosRLI.rotuloRLI}>Pedido</Text>
              <Text style={estilosRLI.valorRLI}>#{idRLI}</Text>
            </View>
            {pedidoRLI && (
              <>
                <View style={estilosRLI.linhaRLI}>
                  <Text style={estilosRLI.rotuloRLI}>Pagamento</Text>
                  <Text style={estilosRLI.valorRLI}>{pedidoRLI.pagamentoRLI}</Text>
                </View>
                <View style={estilosRLI.linhaRLI}>
                  <Text style={estilosRLI.rotuloRLI}>Total</Text>
                  <Text style={[estilosRLI.valorRLI, { color: corRLI.ouroClaroRLI }]}>{formatarPrecoRLI(pedidoRLI.totalRLI)}</Text>
                </View>
                <View style={estilosRLI.linhaRLI}>
                  <Text style={estilosRLI.rotuloRLI}>Entrega</Text>
                  <Text style={[estilosRLI.valorRLI, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>{pedidoRLI.enderecoRLI}</Text>
                </View>
              </>
            )}
          </View>
        </Animated.View>
      </View>
      <View style={{ gap: 12 }}>
        <BotaoRLI tituloRLI="Ver meus pedidos" iconeRLI="receipt-outline" aoPressionarRLI={() => roteadorRLI.replace('/pedidos')} />
        <BotaoRLI tituloRLI="Voltar ao início" varianteRLI="secundario" aoPressionarRLI={() => roteadorRLI.replace('/inicio')} />
      </View>
    </LinearGradient>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },
  centroRLI: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  seloRLI: { width: 124, height: 124, borderRadius: 62, backgroundColor: corRLI.ouroRLI, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderColor: 'rgba(201,182,255,0.3)' },
  tituloRLI: { fontSize: 32, fontFamily: fonteRLI.tituloRLI, color: corRLI.brancoRLI, textAlign: 'center' },
  textoRLI: { fontSize: 14, lineHeight: 21, fontFamily: fonteRLI.regularRLI, color: '#D6D0EC', textAlign: 'center', marginTop: 8, maxWidth: 300 },
  cartaoRLI: { alignSelf: 'stretch', marginTop: 26, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 22, padding: 18, gap: 12, minWidth: 300 },
  linhaRLI: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  rotuloRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: '#BDB7D6' },
  valorRLI: { fontSize: 14, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
});
