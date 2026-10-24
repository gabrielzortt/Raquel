import React, { useRef, useState } from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemRLI from '../components/ImagemRLI';
import BotaoRLI from '../components/BotaoRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { corRLI, fonteRLI, IconeRLI } from '../constants/temaRLI';

interface SlideRLI {
  idRLI: string;
  tituloRLI: string;
  textoRLI: string;
  iconeRLI: IconeRLI;
  legendaRLI: string;
}

const slidesRLI: SlideRLI[] = [
  { idRLI: '1', tituloRLI: 'Brilhe com tecnologia....', textoRLI: 'Joias inteligentes e acessórios com design exclusivo, direto na sua porta. Comece agora!', iconeRLI: 'storefront-outline', legendaRLI: 'Foto da loja / vitrine' },
  { idRLI: '2', tituloRLI: 'Design que pensa por você', textoRLI: 'Anéis, pulseiras e relógios que unem estilo, conforto e tecnologia.', iconeRLI: 'ribbon-outline', legendaRLI: 'Foto de uma joia inteligente' },
  { idRLI: '3', tituloRLI: 'Para cada momento', textoRLI: 'Pagamentos por aproximação, saúde e notificações sem tirar o celular do bolso.', iconeRLI: 'time-outline', legendaRLI: 'Foto das joias em uso' },
  { idRLI: '4', tituloRLI: 'Entrega segura', textoRLI: 'Embalagem presente e acompanhamento do pedido até a sua casa.', iconeRLI: 'cube-outline', legendaRLI: 'Foto da embalagem / entrega' },
];

export default function BoasVindasRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { width: larguraRLI, height: alturaRLI } = useWindowDimensions();
  const { prontoRLI, usuarioRLI } = useLojaRLI();
  const rolagemRLI = useRef<ScrollView>(null);
  const posicaoRLI = useRef(new Animated.Value(0)).current;
  const [indiceRLI, setIndiceRLI] = useState<number>(0);

  if (!prontoRLI) return <View style={estilosRLI.telaRLI} />;
  if (usuarioRLI) return <Redirect href="/inicio" />;

  const alturaImagemRLI = alturaRLI * 0.62;
  const ultimoRLI = indiceRLI === slidesRLI.length - 1;

  const aoTerminarRolagemRLI = (eRLI: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndiceRLI(Math.round(eRLI.nativeEvent.contentOffset.x / larguraRLI));
  };

  const avancarRLI = () => {
    if (ultimoRLI) {
      roteadorRLI.push('/login');
      return;
    }
    const proximoRLI = indiceRLI + 1;
    rolagemRLI.current?.scrollTo({ x: proximoRLI * larguraRLI, animated: true });
    setIndiceRLI(proximoRLI);
  };

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="light" />
      <Animated.ScrollView
        ref={rolagemRLI}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: posicaoRLI } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={aoTerminarRolagemRLI}
      >
        {slidesRLI.map((slideRLI, iRLI) => {
          const faixaRLI = [(iRLI - 1) * larguraRLI, iRLI * larguraRLI, (iRLI + 1) * larguraRLI];
          const deslocamentoRLI = posicaoRLI.interpolate({ inputRange: faixaRLI, outputRange: [larguraRLI * 0.25, 0, -larguraRLI * 0.25], extrapolate: 'clamp' });
          const opacidadeRLI = posicaoRLI.interpolate({ inputRange: faixaRLI, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          return (
            <View key={slideRLI.idRLI} style={{ width: larguraRLI, height: alturaRLI }}>
              <View style={{ height: alturaImagemRLI, borderBottomLeftRadius: 44, borderBottomRightRadius: 44, overflow: 'hidden' }}>
                <ImagemRLI
                  escuroRLI
                  iconeRLI={slideRLI.iconeRLI}
                  legendaRLI={slideRLI.legendaRLI}
                  estiloRLI={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corRLI.marromClaroRLI }}
                />
              </View>
              <Animated.View style={[estilosRLI.textosRLI, { opacity: opacidadeRLI, transform: [{ translateX: deslocamentoRLI }] }]}>
                <Text style={estilosRLI.tituloRLI}>{slideRLI.tituloRLI}</Text>
                <Text style={estilosRLI.textoRLI}>{slideRLI.textoRLI}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {!ultimoRLI && (
        <TouchableOpacity style={[estilosRLI.pularRLI, { top: insetsRLI.top + 14 }]} onPress={() => roteadorRLI.push('/login')} accessibilityLabel="Pular apresentação">
          <Text style={estilosRLI.pularTextoRLI}>Pular</Text>
        </TouchableOpacity>
      )}

      <View style={[estilosRLI.rodapeRLI, { paddingBottom: Math.max(insetsRLI.bottom, 20) + 6 }]}>
        <View style={estilosRLI.pontosRLI}>
          {slidesRLI.map((slideRLI, iRLI) => {
            const faixaRLI = [(iRLI - 1) * larguraRLI, iRLI * larguraRLI, (iRLI + 1) * larguraRLI];
            const larguraPontoRLI = posicaoRLI.interpolate({ inputRange: faixaRLI, outputRange: [8, 30, 8], extrapolate: 'clamp' });
            const opacidadePontoRLI = posicaoRLI.interpolate({ inputRange: faixaRLI, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });
            return <Animated.View key={slideRLI.idRLI} style={[estilosRLI.pontoRLI, { width: larguraPontoRLI, opacity: opacidadePontoRLI }]} />;
          })}
        </View>
        <BotaoRLI tituloRLI={ultimoRLI ? 'Começar' : 'Próximo'} aoPressionarRLI={avancarRLI} />
      </View>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.marromRLI },
  textosRLI: { paddingHorizontal: 30, marginTop: 8 },
  tituloRLI: { fontSize: 26, lineHeight: 34, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  textoRLI: { fontSize: 16, lineHeight: 24, fontFamily: fonteRLI.regularRLI, color: '#E6E1F5', marginTop: 12 },
  pularRLI: { position: 'absolute', right: 20, backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  pularTextoRLI: { fontSize: 13, fontFamily: fonteRLI.mediaRLI, color: corRLI.brancoRLI },
  rodapeRLI: { position: 'absolute', left: 30, right: 30, bottom: 0, gap: 20 },
  pontosRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pontoRLI: { height: 8, borderRadius: 4, backgroundColor: corRLI.brancoRLI },
});
