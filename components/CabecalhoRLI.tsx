import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { corRLI, fonteRLI, sombraRLI } from '../constants/temaRLI';

interface CabecalhoPropsRLI {
  tituloRLI: string;
  direitaRLI?: ReactNode;
}

export default function CabecalhoRLI({ tituloRLI, direitaRLI }: CabecalhoPropsRLI) {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  return (
    <View style={[estilosRLI.linhaRLI, { paddingTop: insetsRLI.top + 12 }]}>
      <TouchableOpacity
        style={estilosRLI.voltarRLI}
        onPress={() => (roteadorRLI.canGoBack() ? roteadorRLI.back() : roteadorRLI.replace('/inicio'))}
        accessibilityLabel="Voltar"
      >
        <Ionicons name="chevron-back" size={22} color={corRLI.textoRLI} />
      </TouchableOpacity>
      <Text style={estilosRLI.tituloRLI}>{tituloRLI}</Text>
      <View style={estilosRLI.direitaRLI}>{direitaRLI}</View>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  linhaRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 14, backgroundColor: corRLI.fundoRLI },
  voltarRLI: { width: 42, height: 42, borderRadius: 14, backgroundColor: corRLI.brancoRLI, alignItems: 'center', justifyContent: 'center', ...sombraRLI.suaveRLI },
  tituloRLI: { fontSize: 20, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  direitaRLI: { width: 42, alignItems: 'flex-end' },
});
