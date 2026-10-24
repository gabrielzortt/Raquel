import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemRLI from '../components/ImagemRLI';
import CampoRLI from '../components/CampoRLI';
import BotaoRLI from '../components/BotaoRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { corRLI, fonteRLI } from '../constants/temaRLI';

interface ErrosRLI {
  nomeRLI?: string;
  emailRLI?: string;
  senhaRLI?: string;
  confirmarRLI?: string;
}

export default function CadastroRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { cadastrarRLI, mostrarToastRLI } = useLojaRLI();
  const [nomeRLI, setNomeRLI] = useState<string>('');
  const [emailRLI, setEmailRLI] = useState<string>('');
  const [senhaRLI, setSenhaRLI] = useState<string>('');
  const [confirmarRLI, setConfirmarRLI] = useState<string>('');
  const [errosRLI, setErrosRLI] = useState<ErrosRLI>({});

  const criarContaRLI = () => {
    const novosErrosRLI: ErrosRLI = {};
    if (nomeRLI.trim().length < 3) novosErrosRLI.nomeRLI = 'Informe seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(emailRLI.trim())) novosErrosRLI.emailRLI = 'Digite um e-mail válido.';
    if (senhaRLI.length < 6) novosErrosRLI.senhaRLI = 'A senha precisa ter ao menos 6 caracteres.';
    if (confirmarRLI !== senhaRLI) novosErrosRLI.confirmarRLI = 'As senhas não coincidem.';
    if (Object.keys(novosErrosRLI).length > 0) {
      setErrosRLI(novosErrosRLI);
      return;
    }
    const resultadoRLI = cadastrarRLI(nomeRLI, emailRLI, senhaRLI);
    if (resultadoRLI) {
      setErrosRLI({ emailRLI: resultadoRLI });
      return;
    }
    mostrarToastRLI('Conta criada com sucesso! Bem-vindo(a).');
    roteadorRLI.replace('/inicio');
  };

  return (
    <KeyboardAvoidingView style={estilosRLI.telaRLI} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: 230 }}>
          <ImagemRLI escuroRLI iconeRLI="images-outline" legendaRLI="Imagem de destaque do cadastro" estiloRLI={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corRLI.marromClaroRLI }} />
          <TouchableOpacity style={[estilosRLI.voltarRLI, { top: insetsRLI.top + 12 }]} onPress={() => (roteadorRLI.canGoBack() ? roteadorRLI.back() : roteadorRLI.replace('/login'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corRLI.brancoRLI} />
          </TouchableOpacity>
        </View>

        <View style={estilosRLI.painelRLI}>
          <Text style={estilosRLI.tituloRLI}>Criar conta</Text>
          <Text style={estilosRLI.subtituloRLI}>Crie sua conta em poucos segundos.</Text>
          <View style={{ gap: 14, marginTop: 8 }}>
            <CampoRLI sobreEscuroRLI iconeRLI="person-outline" placeholderRLI="Nome completo" valorRLI={nomeRLI} aoMudarRLI={setNomeRLI} erroRLI={errosRLI.nomeRLI} />
            <CampoRLI sobreEscuroRLI iconeRLI="mail-outline" placeholderRLI="E-mail" valorRLI={emailRLI} aoMudarRLI={setEmailRLI} tecladoRLI="email-address" erroRLI={errosRLI.emailRLI} />
            <CampoRLI sobreEscuroRLI iconeRLI="lock-closed-outline" placeholderRLI="Senha (mínimo 6 caracteres)" valorRLI={senhaRLI} aoMudarRLI={setSenhaRLI} senhaRLI erroRLI={errosRLI.senhaRLI} />
            <CampoRLI sobreEscuroRLI iconeRLI="shield-checkmark-outline" placeholderRLI="Confirmar senha" valorRLI={confirmarRLI} aoMudarRLI={setConfirmarRLI} senhaRLI aoEnviarRLI={criarContaRLI} erroRLI={errosRLI.confirmarRLI} />
          </View>
          <BotaoRLI tituloRLI="Criar conta" aoPressionarRLI={criarContaRLI} estiloRLI={{ marginTop: 10 }} />
          <View style={estilosRLI.rodapeLinkRLI}>
            <Text style={estilosRLI.rodapeTextoRLI}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => roteadorRLI.replace('/login')}>
              <Text style={estilosRLI.rodapeLinkTextoRLI}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.marromRLI },
  voltarRLI: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelRLI: { flex: 1, backgroundColor: corRLI.marromRLI, marginTop: -34, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 28, paddingTop: 30, paddingBottom: 36, gap: 14 },
  tituloRLI: { fontSize: 26, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  subtituloRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: '#CFC9E6', marginTop: -6 },
  rodapeLinkRLI: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4 },
  rodapeTextoRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: '#CFC9E6' },
  rodapeLinkTextoRLI: { fontSize: 14, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroClaroRLI },
});
