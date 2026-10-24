import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoRLI from './BotaoRLI';
import { corRLI, fonteRLI, IconeRLI } from '../constants/temaRLI';

interface EstadoVazioPropsRLI {
  iconeRLI: IconeRLI;
  tituloRLI: string;
  textoRLI: string;
  botaoRLI?: string;
  aoPressionarRLI?: () => void;
}

export default function EstadoVazioRLI({ iconeRLI, tituloRLI, textoRLI, botaoRLI, aoPressionarRLI }: EstadoVazioPropsRLI) {
  return (
    <View style={estilosRLI.caixaRLI}>
      <View style={estilosRLI.circuloRLI}>
        <Ionicons name={iconeRLI} size={38} color={corRLI.ouroEscuroRLI} />
      </View>
      <Text style={estilosRLI.tituloRLI}>{tituloRLI}</Text>
      <Text style={estilosRLI.textoRLI}>{textoRLI}</Text>
      {botaoRLI && aoPressionarRLI ? <BotaoRLI tituloRLI={botaoRLI} aoPressionarRLI={aoPressionarRLI} alturaRLI={48} estiloRLI={{ marginTop: 20 }} /> : null}
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  caixaRLI: { alignItems: 'center', paddingVertical: 56, paddingHorizontal: 32 },
  circuloRLI: { width: 88, height: 88, borderRadius: 44, backgroundColor: corRLI.areiaRLI, alignItems: 'center', justifyContent: 'center' },
  tituloRLI: { fontSize: 20, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI, marginTop: 18 },
  textoRLI: { fontSize: 14, lineHeight: 21, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, textAlign: 'center', marginTop: 6 },
});
