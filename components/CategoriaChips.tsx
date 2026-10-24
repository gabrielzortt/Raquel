import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corRLI, fonteRLI } from '../constants/temaRLI';

interface CategoriaChipsPropsRLI {
  opcoesRLI: string[];
  selecionadaRLI: string;
  aoSelecionarRLI: (valorRLI: string) => void;
}

export default function CategoriaChipsRLI({ opcoesRLI, selecionadaRLI, aoSelecionarRLI }: CategoriaChipsPropsRLI) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilosRLI.linhaRLI}>
      {opcoesRLI.map((opcaoRLI) => {
        const ativaRLI = opcaoRLI === selecionadaRLI;
        return (
          <TouchableOpacity key={opcaoRLI} activeOpacity={0.85} onPress={() => aoSelecionarRLI(opcaoRLI)} style={[estilosRLI.chipRLI, ativaRLI && estilosRLI.chipAtivoRLI]}>
            <Text style={[estilosRLI.textoRLI, ativaRLI && estilosRLI.textoAtivoRLI]}>{opcaoRLI}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const estilosRLI = StyleSheet.create({
  linhaRLI: { paddingHorizontal: 20, paddingVertical: 18, gap: 10 },
  chipRLI: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 22 },
  chipAtivoRLI: { backgroundColor: corRLI.cobreRLI, shadowColor: corRLI.cobreRLI, shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  textoRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
  textoAtivoRLI: { color: corRLI.brancoRLI, fontFamily: fonteRLI.semiRLI },
});
