import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { corRLI, fonteRLI, gradienteRLI, IconeRLI } from '../constants/temaRLI';

interface BotaoPropsRLI {
  tituloRLI: string;
  aoPressionarRLI: () => void;
  varianteRLI?: 'primario' | 'secundario' | 'escuro';
  sobreEscuroRLI?: boolean;
  iconeRLI?: IconeRLI;
  estiloRLI?: StyleProp<ViewStyle>;
  alturaRLI?: number;
}

export default function BotaoRLI({ tituloRLI, aoPressionarRLI, varianteRLI = 'primario', sobreEscuroRLI = false, iconeRLI, estiloRLI, alturaRLI = 54 }: BotaoPropsRLI) {
  const raioRLI = alturaRLI / 2;
  const corTextoRLI =
    varianteRLI === 'primario' ? corRLI.brancoRLI : varianteRLI === 'escuro' ? corRLI.cremeRLI : sobreEscuroRLI ? corRLI.brancoRLI : corRLI.ouroEscuroRLI;
  return (
    <Pressable
      onPress={aoPressionarRLI}
      accessibilityRole="button"
      style={({ pressed: pressedRLI }) => [
        estilosRLI.baseRLI,
        { height: alturaRLI, borderRadius: raioRLI },
        varianteRLI === 'primario' && estilosRLI.sombraPrimarioRLI,
        varianteRLI === 'secundario' && estilosRLI.secundarioRLI,
        varianteRLI === 'escuro' && estilosRLI.escuroRLI,
        pressedRLI && { transform: [{ scale: 0.97 }], opacity: 0.93 },
        estiloRLI,
      ]}
    >
      {varianteRLI === 'primario' && (
        <LinearGradient colors={gradienteRLI.ouroRLI} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, { borderRadius: raioRLI }]} />
      )}
      <View style={estilosRLI.conteudoRLI}>
        {iconeRLI ? <Ionicons name={iconeRLI} size={20} color={corTextoRLI} /> : null}
        <Text style={[estilosRLI.textoRLI, { color: corTextoRLI }]}>{tituloRLI}</Text>
      </View>
    </Pressable>
  );
}

const estilosRLI = StyleSheet.create({
  baseRLI: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  sombraPrimarioRLI: { shadowColor: corRLI.ouroRLI, shadowOpacity: 0.35, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  secundarioRLI: { borderWidth: 1.5, borderColor: corRLI.ouroRLI, backgroundColor: 'transparent' },
  escuroRLI: { backgroundColor: corRLI.marromRLI },
  conteudoRLI: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoRLI: { fontFamily: fonteRLI.semiRLI, fontSize: 16, letterSpacing: 0.2 },
});
