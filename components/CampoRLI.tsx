import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corRLI, fonteRLI, IconeRLI } from '../constants/temaRLI';

interface CampoPropsRLI {
  rotuloRLI?: string;
  iconeRLI?: IconeRLI;
  placeholderRLI: string;
  valorRLI: string;
  aoMudarRLI: (textoRLI: string) => void;
  senhaRLI?: boolean;
  tecladoRLI?: KeyboardTypeOptions;
  erroRLI?: string;
  aoEnviarRLI?: () => void;
  somenteLeituraRLI?: boolean;
  sobreEscuroRLI?: boolean;
}

export default function CampoRLI({
  rotuloRLI, iconeRLI, placeholderRLI, valorRLI, aoMudarRLI, senhaRLI = false,
  tecladoRLI, erroRLI, aoEnviarRLI, somenteLeituraRLI = false, sobreEscuroRLI = false,
}: CampoPropsRLI) {
  const [focoRLI, setFocoRLI] = useState<boolean>(false);
  const [visivelRLI, setVisivelRLI] = useState<boolean>(false);

  return (
    <View>
      {rotuloRLI ? <Text style={[estilosRLI.rotuloRLI, sobreEscuroRLI && { color: corRLI.brancoRLI }]}>{rotuloRLI}</Text> : null}
      <View style={[estilosRLI.campoRLI, focoRLI && estilosRLI.focoRLI, !!erroRLI && estilosRLI.erroCampoRLI, somenteLeituraRLI && { opacity: 0.6 }]}>
        {iconeRLI ? <Ionicons name={iconeRLI} size={24} color={corRLI.ouroRLI} /> : null}
        <TextInput
          style={estilosRLI.entradaRLI}
          placeholder={placeholderRLI}
          placeholderTextColor="#8E8E8E"
          value={valorRLI}
          onChangeText={aoMudarRLI}
          secureTextEntry={senhaRLI && !visivelRLI}
          keyboardType={tecladoRLI}
          autoCapitalize={senhaRLI || tecladoRLI === 'email-address' ? 'none' : 'sentences'}
          autoCorrect={false}
          onFocus={() => setFocoRLI(true)}
          onBlur={() => setFocoRLI(false)}
          onSubmitEditing={aoEnviarRLI}
          editable={!somenteLeituraRLI}
        />
        {senhaRLI ? (
          <TouchableOpacity onPress={() => setVisivelRLI(!visivelRLI)} accessibilityLabel="Mostrar ou ocultar senha">
            <Ionicons name={visivelRLI ? 'eye-off-outline' : 'eye-outline'} size={22} color="#8E8E8E" />
          </TouchableOpacity>
        ) : null}
      </View>
      {erroRLI ? <Text style={[estilosRLI.erroTextoRLI, sobreEscuroRLI && { color: corRLI.erroClaroRLI }]}>{erroRLI}</Text> : null}
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  rotuloRLI: { fontSize: 13, fontFamily: fonteRLI.mediaRLI, color: corRLI.textoRLI, marginBottom: 6, marginLeft: 6 },
  campoRLI: {
    flexDirection: 'row', alignItems: 'center', gap: 12, height: 54, borderRadius: 27,
    backgroundColor: corRLI.cremeRLI, borderWidth: 1.5, borderColor: corRLI.ouroRLI, paddingHorizontal: 18,
  },
  focoRLI: { backgroundColor: corRLI.brancoRLI, shadowColor: corRLI.ouroRLI, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  erroCampoRLI: { borderColor: corRLI.erroRLI },
  entradaRLI: { flex: 1, height: '100%', fontSize: 15, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
  erroTextoRLI: { color: corRLI.erroRLI, fontSize: 12, fontFamily: fonteRLI.mediaRLI, marginTop: 6, marginLeft: 10 },
});
