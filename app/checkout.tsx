import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CabecalhoRLI from '../components/CabecalhoRLI';
import CampoRLI from '../components/CampoRLI';
import BotaoRLI from '../components/BotaoRLI';
import EstadoVazioRLI from '../components/EstadoVazio';
import { useLojaRLI } from '../context/LojaRLI';
import { formatarPrecoRLI } from '../data/produtosRLI';
import { corRLI, fonteRLI, sombraRLI, IconeRLI } from '../constants/temaRLI';

type PagamentoRLI = 'Pix' | 'Cartão de crédito' | 'Boleto';

const pagamentosRLI: { nomeRLI: PagamentoRLI; iconeRLI: IconeRLI; detalheRLI: string }[] = [
  { nomeRLI: 'Pix', iconeRLI: 'qr-code-outline', detalheRLI: 'Aprovação imediata' },
  { nomeRLI: 'Cartão de crédito', iconeRLI: 'card-outline', detalheRLI: 'Em até 3x sem juros' },
  { nomeRLI: 'Boleto', iconeRLI: 'barcode-outline', detalheRLI: 'Vence em 2 dias úteis' },
];

export default function CheckoutRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { itensRLI, subtotalRLI, descontoRLI, freteRLI, totalRLI, finalizarPedidoRLI, usuarioRLI } = useLojaRLI();
  const [cepRLI, setCepRLI] = useState<string>('');
  const [ruaRLI, setRuaRLI] = useState<string>('');
  const [numeroRLI, setNumeroRLI] = useState<string>('');
  const [bairroRLI, setBairroRLI] = useState<string>('');
  const [cidadeRLI, setCidadeRLI] = useState<string>('Manaus - AM');
  const [pagamentoRLI, setPagamentoRLI] = useState<PagamentoRLI>('Pix');
  const [errosRLI, setErrosRLI] = useState<Record<string, string>>({});

  if (itensRLI.length === 0) {
    return (
      <View style={estilosRLI.telaRLI}>
        <StatusBar style="dark" />
        <CabecalhoRLI tituloRLI="Finalizar compra" />
        <EstadoVazioRLI iconeRLI="bag-outline" tituloRLI="Carrinho vazio" textoRLI="Adicione peças ao carrinho para finalizar a compra." botaoRLI="Explorar peças" aoPressionarRLI={() => roteadorRLI.replace('/inicio')} />
      </View>
    );
  }

  const confirmarRLI = () => {
    const novosRLI: Record<string, string> = {};
    if (ruaRLI.trim() === '') novosRLI.ruaRLI = 'Informe a rua.';
    if (numeroRLI.trim() === '') novosRLI.numeroRLI = 'Informe o número.';
    if (bairroRLI.trim() === '') novosRLI.bairroRLI = 'Informe o bairro.';
    if (cepRLI.replace(/\D/g, '').length !== 8) novosRLI.cepRLI = 'CEP com 8 dígitos.';
    setErrosRLI(novosRLI);
    if (Object.keys(novosRLI).length > 0) return;
    const enderecoRLI = `${ruaRLI.trim()}, ${numeroRLI.trim()} - ${bairroRLI.trim()}, ${cidadeRLI.trim()}`;
    const idRLI = finalizarPedidoRLI(pagamentoRLI, enderecoRLI);
    roteadorRLI.replace({ pathname: '/pedido-confirmado', params: { id: idRLI } });
  };

  return (
    <KeyboardAvoidingView style={estilosRLI.telaRLI} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <CabecalhoRLI tituloRLI="Finalizar compra" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 18 }}>
        <View style={estilosRLI.cartaoRLI}>
          <View style={estilosRLI.secaoTopoRLI}>
            <View style={estilosRLI.numeroRLI}><Text style={estilosRLI.numeroTextoRLI}>1</Text></View>
            <Text style={estilosRLI.secaoTituloRLI}>Endereço de entrega</Text>
          </View>
          <Text style={estilosRLI.paraRLI}>Para: {usuarioRLI?.nomeRLI}</Text>
          <View style={{ gap: 12 }}>
            <CampoRLI iconeRLI="location-outline" placeholderRLI="CEP" valorRLI={cepRLI} aoMudarRLI={setCepRLI} tecladoRLI="number-pad" erroRLI={errosRLI.cepRLI} />
            <CampoRLI iconeRLI="home-outline" placeholderRLI="Rua / Avenida" valorRLI={ruaRLI} aoMudarRLI={setRuaRLI} erroRLI={errosRLI.ruaRLI} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <CampoRLI placeholderRLI="Número" valorRLI={numeroRLI} aoMudarRLI={setNumeroRLI} tecladoRLI="number-pad" erroRLI={errosRLI.numeroRLI} />
              </View>
              <View style={{ flex: 2 }}>
                <CampoRLI placeholderRLI="Bairro" valorRLI={bairroRLI} aoMudarRLI={setBairroRLI} erroRLI={errosRLI.bairroRLI} />
              </View>
            </View>
            <CampoRLI iconeRLI="business-outline" placeholderRLI="Cidade" valorRLI={cidadeRLI} aoMudarRLI={setCidadeRLI} />
          </View>
        </View>

        <View style={estilosRLI.cartaoRLI}>
          <View style={estilosRLI.secaoTopoRLI}>
            <View style={estilosRLI.numeroRLI}><Text style={estilosRLI.numeroTextoRLI}>2</Text></View>
            <Text style={estilosRLI.secaoTituloRLI}>Forma de pagamento</Text>
          </View>
          <View style={{ gap: 10 }}>
            {pagamentosRLI.map((pRLI) => {
              const ativoRLI = pRLI.nomeRLI === pagamentoRLI;
              return (
                <TouchableOpacity key={pRLI.nomeRLI} activeOpacity={0.85} style={[estilosRLI.pagamentoRLI, ativoRLI && estilosRLI.pagamentoAtivoRLI]} onPress={() => setPagamentoRLI(pRLI.nomeRLI)}>
                  <View style={estilosRLI.pagamentoIconeRLI}>
                    <Ionicons name={pRLI.iconeRLI} size={22} color={corRLI.ouroEscuroRLI} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={estilosRLI.pagamentoNomeRLI}>{pRLI.nomeRLI}</Text>
                    <Text style={estilosRLI.pagamentoDetalheRLI}>{pRLI.detalheRLI}</Text>
                  </View>
                  <Ionicons name={ativoRLI ? 'radio-button-on' : 'radio-button-off'} size={22} color={ativoRLI ? corRLI.ouroRLI : '#C9BDB4'} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={estilosRLI.cartaoRLI}>
          <View style={estilosRLI.secaoTopoRLI}>
            <View style={estilosRLI.numeroRLI}><Text style={estilosRLI.numeroTextoRLI}>3</Text></View>
            <Text style={estilosRLI.secaoTituloRLI}>Resumo do pedido</Text>
          </View>
          {itensRLI.map((iRLI) => (
            <View key={`${iRLI.produtoRLI.idRLI}-${iRLI.tamanhoRLI}`} style={estilosRLI.linhaRLI}>
              <Text style={estilosRLI.linhaTextoRLI} numberOfLines={1}>{iRLI.quantidadeRLI}x {iRLI.produtoRLI.nomeRLI} ({iRLI.tamanhoRLI})</Text>
              <Text style={estilosRLI.linhaValorRLI}>{formatarPrecoRLI(iRLI.produtoRLI.precoRLI * iRLI.quantidadeRLI)}</Text>
            </View>
          ))}
          <View style={estilosRLI.divisorRLI} />
          <View style={estilosRLI.linhaRLI}><Text style={estilosRLI.resumoRotuloRLI}>Subtotal</Text><Text style={estilosRLI.linhaValorRLI}>{formatarPrecoRLI(subtotalRLI)}</Text></View>
          {descontoRLI > 0 && <View style={estilosRLI.linhaRLI}><Text style={estilosRLI.resumoRotuloRLI}>Desconto</Text><Text style={[estilosRLI.linhaValorRLI, { color: corRLI.sucessoRLI }]}>- {formatarPrecoRLI(descontoRLI)}</Text></View>}
          <View style={estilosRLI.linhaRLI}><Text style={estilosRLI.resumoRotuloRLI}>Frete</Text><Text style={estilosRLI.linhaValorRLI}>{freteRLI === 0 ? 'Grátis' : formatarPrecoRLI(freteRLI)}</Text></View>
        </View>
      </ScrollView>

      <View style={[estilosRLI.rodapeRLI, { paddingBottom: Math.max(insetsRLI.bottom, 14) }]}>
        <View>
          <Text style={estilosRLI.totalRotuloRLI}>Total</Text>
          <Text style={estilosRLI.totalRLI}>{formatarPrecoRLI(totalRLI)}</Text>
        </View>
        <BotaoRLI tituloRLI="Confirmar pedido" iconeRLI="checkmark-circle-outline" aoPressionarRLI={confirmarRLI} estiloRLI={{ flex: 1 }} />
      </View>
    </KeyboardAvoidingView>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  cartaoRLI: { backgroundColor: corRLI.brancoRLI, borderRadius: 24, padding: 18, gap: 14, ...sombraRLI.suaveRLI },
  secaoTopoRLI: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  numeroRLI: { width: 28, height: 28, borderRadius: 10, backgroundColor: corRLI.ouroRLI, alignItems: 'center', justifyContent: 'center' },
  numeroTextoRLI: { fontSize: 13, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  secaoTituloRLI: { fontSize: 18, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  paraRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: -4 },
  pagamentoRLI: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, borderWidth: 1.5, borderColor: corRLI.bordaRLI },
  pagamentoAtivoRLI: { borderColor: corRLI.ouroRLI, backgroundColor: corRLI.cremeRLI },
  pagamentoIconeRLI: { width: 42, height: 42, borderRadius: 13, backgroundColor: corRLI.brancoRLI, alignItems: 'center', justifyContent: 'center' },
  pagamentoNomeRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  pagamentoDetalheRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 1 },
  linhaRLI: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  linhaTextoRLI: { flex: 1, fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
  linhaValorRLI: { fontSize: 14, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  resumoRotuloRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  divisorRLI: { height: 1, backgroundColor: corRLI.bordaRLI },
  rodapeRLI: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corRLI.brancoRLI, ...sombraRLI.forteRLI },
  totalRotuloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  totalRLI: { fontSize: 22, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
});
