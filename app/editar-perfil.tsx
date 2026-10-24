import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import CabecalhoRLI from '../components/CabecalhoRLI';
import CampoRLI from '../components/CampoRLI';
import BotaoRLI from '../components/BotaoRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { corRLI } from '../constants/temaRLI';

export default function EditarPerfilRLI() {
  const roteadorRLI = useRouter();
  const { usuarioRLI, atualizarPerfilRLI, mostrarToastRLI } = useLojaRLI();
  const [nomeRLI, setNomeRLI] = useState<string>(usuarioRLI?.nomeRLI ?? '');
  const [telefoneRLI, setTelefoneRLI] = useState<string>(usuarioRLI?.telefoneRLI ?? '');
  const [erroRLI, setErroRLI] = useState<string>('');

  const salvarRLI = () => {
    if (nomeRLI.trim().length < 3) {
      setErroRLI('Informe seu nome completo.');
      return;
    }
    atualizarPerfilRLI(nomeRLI, telefoneRLI);
    mostrarToastRLI('Perfil atualizado');
    roteadorRLI.back();
  };

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <CabecalhoRLI tituloRLI="Editar perfil" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, gap: 16, paddingBottom: 32 }}>
        <CampoRLI rotuloRLI="Nome completo" iconeRLI="person-outline" placeholderRLI="Seu nome" valorRLI={nomeRLI} aoMudarRLI={setNomeRLI} erroRLI={erroRLI} />
        <CampoRLI rotuloRLI="E-mail" iconeRLI="mail-outline" placeholderRLI="E-mail" valorRLI={usuarioRLI?.emailRLI ?? ''} aoMudarRLI={() => undefined} somenteLeituraRLI />
        <CampoRLI rotuloRLI="Telefone" iconeRLI="call-outline" placeholderRLI="(92) 90000-0000" valorRLI={telefoneRLI} aoMudarRLI={setTelefoneRLI} tecladoRLI="phone-pad" aoEnviarRLI={salvarRLI} />
        <BotaoRLI tituloRLI="Salvar alterações" iconeRLI="checkmark" aoPressionarRLI={salvarRLI} estiloRLI={{ marginTop: 10 }} />
      </ScrollView>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
});
