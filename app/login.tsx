import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemRLI from '../components/ImagemRLI';
import CampoRLI from '../components/CampoRLI';
import BotaoRLI from '../components/BotaoRLI';
import { useLojaRLI } from '../context/LojaRLI';
import { corRLI, fonteRLI } from '../constants/temaRLI';

export default function LoginRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { height: alturaRLI } = useWindowDimensions();
  const { entrarRLI } = useLojaRLI();
  const [emailRLI, setEmailRLI] = useState<string>('');
  const [senhaRLI, setSenhaRLI] = useState<string>('');
  const [erroRLI, setErroRLI] = useState<string>('');

  const verificarLoginRLI = () => {
    const resultadoRLI = entrarRLI(emailRLI, senhaRLI);
    if (resultadoRLI) {
      setErroRLI(resultadoRLI);
      return;
    }
    setErroRLI('');
    roteadorRLI.replace('/inicio');
  };

  const usarContaTesteRLI = () => {
    setEmailRLI('cliente@joias.com');
    setSenhaRLI('123456');
    setErroRLI('');
  };

  return (
    <KeyboardAvoidingView style={estilosRLI.telaRLI} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: Math.max(alturaRLI * 0.44, 300) }}>
          <ImagemRLI escuroRLI iconeRLI="images-outline" legendaRLI="Imagem de destaque do login" estiloRLI={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corRLI.marromClaroRLI }} />
          <TouchableOpacity style={[estilosRLI.voltarRLI, { top: insetsRLI.top + 12 }]} onPress={() => (roteadorRLI.canGoBack() ? roteadorRLI.back() : roteadorRLI.replace('/'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corRLI.brancoRLI} />
          </TouchableOpacity>
        </View>

        <View style={estilosRLI.painelRLI}>
          <Text style={estilosRLI.tituloRLI}>Bem-vindo de volta</Text>
          <Text style={estilosRLI.subtituloRLI}>Entre para continuar suas compras.</Text>
          <View style={{ gap: 14, marginTop: 8 }}>
            <CampoRLI iconeRLI="mail-outline" placeholderRLI="E-mail" valorRLI={emailRLI} aoMudarRLI={setEmailRLI} tecladoRLI="email-address" />
            <CampoRLI iconeRLI="lock-closed-outline" placeholderRLI="Senha" valorRLI={senhaRLI} aoMudarRLI={setSenhaRLI} senhaRLI aoEnviarRLI={verificarLoginRLI} />
          </View>
          {erroRLI !== '' && (
            <View style={estilosRLI.erroRLI}>
              <Ionicons name="alert-circle" size={18} color={corRLI.erroClaroRLI} />
              <Text style={estilosRLI.erroTextoRLI}>{erroRLI}</Text>
            </View>
          )}
          <BotaoRLI tituloRLI="Entrar" aoPressionarRLI={verificarLoginRLI} estiloRLI={{ marginTop: 10 }} />
          <BotaoRLI tituloRLI="Criar uma conta" varianteRLI="secundario" sobreEscuroRLI aoPressionarRLI={() => roteadorRLI.push('/cadastro')} />
          <TouchableOpacity onPress={usarContaTesteRLI} style={estilosRLI.testeRLI}>
            <Text style={estilosRLI.testeTextoRLI}>Usar conta de teste</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.marromRLI },
  voltarRLI: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelRLI: { flex: 1, backgroundColor: corRLI.marromRLI, marginTop: -34, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 28, paddingTop: 30, paddingBottom: 32, gap: 14 },
  tituloRLI: { fontSize: 26, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  subtituloRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: '#CFC9E6', marginTop: -6 },
  erroRLI: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(229,72,77,0.16)', borderRadius: 14, padding: 12 },
  erroTextoRLI: { flex: 1, color: corRLI.erroClaroRLI, fontSize: 13, fontFamily: fonteRLI.mediaRLI },
  testeRLI: { alignSelf: 'center', padding: 6 },
  testeTextoRLI: { fontSize: 13, fontFamily: fonteRLI.mediaRLI, color: corRLI.ouroClaroRLI },
});
