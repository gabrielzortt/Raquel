import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corRLI, fonteRLI } from '../constants/temaRLI';

interface SeletorPropsRLI {
  valorRLI: number;
  aoDiminuirRLI: () => void;
  aoAumentarRLI: () => void;
}

export default function SeletorQuantidadeRLI({ valorRLI, aoDiminuirRLI, aoAumentarRLI }: SeletorPropsRLI) {
  return (
    <View style={estilosRLI.linhaRLI}>
      <TouchableOpacity style={estilosRLI.botaoRLI} onPress={aoDiminuirRLI} accessibilityLabel="Diminuir quantidade">
        <Ionicons name="remove" size={18} color={corRLI.textoRLI} />
      </TouchableOpacity>
      <Text style={estilosRLI.valorRLI}>{valorRLI}</Text>
      <TouchableOpacity style={estilosRLI.botaoRLI} onPress={aoAumentarRLI} accessibilityLabel="Aumentar quantidade">
        <Ionicons name="add" size={18} color={corRLI.textoRLI} />
      </TouchableOpacity>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  linhaRLI: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: corRLI.cremeRLI, borderRadius: 14, padding: 4, borderWidth: 1, borderColor: corRLI.bordaRLI },
  botaoRLI: { width: 32, height: 32, borderRadius: 10, backgroundColor: corRLI.brancoRLI, alignItems: 'center', justifyContent: 'center' },
  valorRLI: { minWidth: 18, textAlign: 'center', fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
});
