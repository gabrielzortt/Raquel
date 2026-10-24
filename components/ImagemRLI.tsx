import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corRLI, fonteRLI, IconeRLI } from '../constants/temaRLI';

interface ImagemPropsRLI {
  fonteRLI?: ImageSourcePropType;
  legendaRLI?: string;
  estiloRLI?: StyleProp<ViewStyle>;
  iconeRLI?: IconeRLI;
  escuroRLI?: boolean;
  compactoRLI?: boolean;
}

export default function ImagemRLI({ fonteRLI: fonteImagemRLI, legendaRLI, estiloRLI, iconeRLI = 'image-outline', escuroRLI = false, compactoRLI = false }: ImagemPropsRLI) {
  return (
    <View style={[estilosRLI.baseRLI, escuroRLI ? estilosRLI.escuroRLI : estilosRLI.claroRLI, estiloRLI]}>
      {fonteImagemRLI ? (
        <Image source={fonteImagemRLI} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <View style={estilosRLI.centroRLI}>
          <Ionicons name={iconeRLI} size={compactoRLI ? 22 : 38} color={escuroRLI ? corRLI.ouroClaroRLI : corRLI.ouroEscuroRLI} />
          <Text style={[estilosRLI.textoRLI, compactoRLI && { fontSize: 10 }, { color: escuroRLI ? corRLI.ouroClaroRLI : corRLI.ouroEscuroRLI }]}>
            (imagem aqui)
          </Text>
          {!compactoRLI && legendaRLI ? (
            <Text style={[estilosRLI.legendaRLI, { color: escuroRLI ? '#BDB7D6' : corRLI.suaveRLI }]} numberOfLines={2}>
              {legendaRLI}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  baseRLI: { overflow: 'hidden', borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  claroRLI: { backgroundColor: corRLI.cremeRLI, borderColor: corRLI.ouroRLI },
  escuroRLI: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: corRLI.ouroRLI },
  centroRLI: { alignItems: 'center', gap: 4, paddingHorizontal: 12 },
  textoRLI: { fontFamily: fonteRLI.semiRLI, fontSize: 13 },
  legendaRLI: { fontFamily: fonteRLI.regularRLI, fontSize: 11, textAlign: 'center' },
});
