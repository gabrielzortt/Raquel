import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import BotaoRLI from './BotaoRLI';
import { corRLI, fonteRLI } from '../constants/temaRLI';

interface ConfirmarPropsRLI {
  visivelRLI: boolean;
  tituloRLI: string;
  textoRLI: string;
  confirmarRLI: string;
  aoConfirmarRLI: () => void;
  aoCancelarRLI: () => void;
}

export default function ConfirmarModalRLI({ visivelRLI, tituloRLI, textoRLI, confirmarRLI, aoConfirmarRLI, aoCancelarRLI }: ConfirmarPropsRLI) {
  return (
    <Modal visible={visivelRLI} transparent animationType="fade" onRequestClose={aoCancelarRLI}>
      <Pressable style={estilosRLI.fundoRLI} onPress={aoCancelarRLI}>
        <Pressable style={estilosRLI.caixaRLI} onPress={() => undefined}>
          <Text style={estilosRLI.tituloRLI}>{tituloRLI}</Text>
          <Text style={estilosRLI.textoRLI}>{textoRLI}</Text>
          <View style={estilosRLI.linhaRLI}>
            <BotaoRLI tituloRLI="Cancelar" varianteRLI="secundario" aoPressionarRLI={aoCancelarRLI} alturaRLI={48} estiloRLI={{ flex: 1 }} />
            <BotaoRLI tituloRLI={confirmarRLI} aoPressionarRLI={aoConfirmarRLI} alturaRLI={48} estiloRLI={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilosRLI = StyleSheet.create({
  fundoRLI: { flex: 1, backgroundColor: 'rgba(20,18,43,0.55)', alignItems: 'center', justifyContent: 'center', padding: 28 },
  caixaRLI: { width: '100%', maxWidth: 380, backgroundColor: corRLI.brancoRLI, borderRadius: 26, padding: 24 },
  tituloRLI: { fontSize: 22, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  textoRLI: { fontSize: 14, lineHeight: 21, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 8 },
  linhaRLI: { flexDirection: 'row', gap: 12, marginTop: 24 },
});
