import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmarModalRLI from '../../components/ConfirmarModal';
import { useLojaRLI } from '../../context/LojaRLI';
import { corRLI, fonteRLI, gradienteRLI, sombraRLI, IconeRLI } from '../../constants/temaRLI';

export default function PerfilRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { usuarioRLI, pedidosRLI, favoritosRLI, quantidadeTotalRLI, sairRLI } = useLojaRLI();
  const [sairAbertoRLI, setSairAbertoRLI] = useState<boolean>(false);

  const menuRLI: { rotuloRLI: string; iconeRLI: IconeRLI; aoPressionarRLI: () => void }[] = [
    { rotuloRLI: 'Meus pedidos', iconeRLI: 'receipt-outline', aoPressionarRLI: () => roteadorRLI.push('/pedidos') },
    { rotuloRLI: 'Meus favoritos', iconeRLI: 'heart-outline', aoPressionarRLI: () => roteadorRLI.push('/favoritos') },
    { rotuloRLI: 'Editar perfil', iconeRLI: 'create-outline', aoPressionarRLI: () => roteadorRLI.push('/editar-perfil') },
    { rotuloRLI: 'Notificações', iconeRLI: 'notifications-outline', aoPressionarRLI: () => roteadorRLI.push('/notificacoes') },
    { rotuloRLI: 'Sobre a loja', iconeRLI: 'information-circle-outline', aoPressionarRLI: () => roteadorRLI.push('/sobre') },
  ];

  const estatisticasRLI = [
    { rotuloRLI: 'Pedidos', valorRLI: pedidosRLI.length },
    { rotuloRLI: 'Favoritos', valorRLI: favoritosRLI.length },
    { rotuloRLI: 'No carrinho', valorRLI: quantidadeTotalRLI },
  ];

  const confirmarSairRLI = () => {
    setSairAbertoRLI(false);
    sairRLI();
    roteadorRLI.replace('/login');
  };

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient colors={gradienteRLI.cinzaRLI} style={[estilosRLI.topoRLI, { paddingTop: insetsRLI.top + 24 }]}>
          <View style={estilosRLI.avatarRLI}>
            <Text style={estilosRLI.avatarTextoRLI}>{(usuarioRLI?.nomeRLI ?? 'C').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={estilosRLI.nomeRLI}>{usuarioRLI?.nomeRLI}</Text>
          <Text style={estilosRLI.emailRLI}>{usuarioRLI?.emailRLI}</Text>
        </LinearGradient>

        <View style={estilosRLI.estatisticasRLI}>
          {estatisticasRLI.map((eRLI, iRLI) => (
            <View key={eRLI.rotuloRLI} style={[estilosRLI.estatisticaRLI, iRLI < estatisticasRLI.length - 1 && estilosRLI.divisorRLI]}>
              <Text style={estilosRLI.estatisticaValorRLI}>{eRLI.valorRLI}</Text>
              <Text style={estilosRLI.estatisticaRotuloRLI}>{eRLI.rotuloRLI}</Text>
            </View>
          ))}
        </View>

        <View style={estilosRLI.menuRLI}>
          {menuRLI.map((itemRLI, iRLI) => (
            <TouchableOpacity key={itemRLI.rotuloRLI} style={[estilosRLI.itemRLI, iRLI < menuRLI.length - 1 && estilosRLI.itemBordaRLI]} activeOpacity={0.7} onPress={itemRLI.aoPressionarRLI}>
              <View style={estilosRLI.itemIconeRLI}>
                <Ionicons name={itemRLI.iconeRLI} size={21} color={corRLI.ouroEscuroRLI} />
              </View>
              <Text style={estilosRLI.itemTextoRLI}>{itemRLI.rotuloRLI}</Text>
              <Ionicons name="chevron-forward" size={18} color="#B8ABA2" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={estilosRLI.sairRLI} onPress={() => setSairAbertoRLI(true)} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={corRLI.erroRLI} />
          <Text style={estilosRLI.sairTextoRLI}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmarModalRLI
        visivelRLI={sairAbertoRLI}
        tituloRLI="Sair da conta?"
        textoRLI="Você precisará entrar novamente para continuar suas compras."
        confirmarRLI="Sair"
        aoConfirmarRLI={confirmarSairRLI}
        aoCancelarRLI={() => setSairAbertoRLI(false)}
      />
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  topoRLI: { alignItems: 'center', paddingBottom: 60, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 },
  avatarRLI: { width: 96, height: 96, borderRadius: 32, backgroundColor: corRLI.ouroRLI, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.18)' },
  avatarTextoRLI: { fontSize: 42, fontFamily: fonteRLI.tituloRLI, color: corRLI.brancoRLI },
  nomeRLI: { fontSize: 24, fontFamily: fonteRLI.tituloRLI, color: corRLI.brancoRLI, marginTop: 14 },
  emailRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: '#BDB7D6', marginTop: 3 },
  estatisticasRLI: { flexDirection: 'row', marginHorizontal: 20, marginTop: -34, backgroundColor: corRLI.brancoRLI, borderRadius: 22, paddingVertical: 18, ...sombraRLI.forteRLI },
  estatisticaRLI: { flex: 1, alignItems: 'center' },
  divisorRLI: { borderRightWidth: 1, borderRightColor: corRLI.bordaRLI },
  estatisticaValorRLI: { fontSize: 24, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  estatisticaRotuloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 2 },
  menuRLI: { marginHorizontal: 20, marginTop: 22, backgroundColor: corRLI.brancoRLI, borderRadius: 22, paddingHorizontal: 6, ...sombraRLI.suaveRLI },
  itemRLI: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, paddingHorizontal: 12 },
  itemBordaRLI: { borderBottomWidth: 1, borderBottomColor: '#EEE9F8' },
  itemIconeRLI: { width: 40, height: 40, borderRadius: 13, backgroundColor: corRLI.cremeRLI, alignItems: 'center', justifyContent: 'center' },
  itemTextoRLI: { flex: 1, fontSize: 15, fontFamily: fonteRLI.mediaRLI, color: corRLI.textoRLI },
  sairRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 18, height: 54, borderRadius: 18, backgroundColor: '#FCEDEA' },
  sairTextoRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.erroRLI },
});
