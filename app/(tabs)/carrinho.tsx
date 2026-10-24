import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemRLI from '../../components/ImagemRLI';
import SeletorQuantidadeRLI from '../../components/SeletorQuantidade';
import BotaoRLI from '../../components/BotaoRLI';
import EstadoVazioRLI from '../../components/EstadoVazio';
import { useLojaRLI } from '../../context/LojaRLI';
import { formatarPrecoRLI } from '../../data/produtosRLI';
import { corRLI, fonteRLI, sombraRLI } from '../../constants/temaRLI';

export default function CarrinhoRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { itensRLI, alterarQuantidadeRLI, removerRLI, subtotalRLI, descontoRLI, freteRLI, totalRLI, cupomRLI, aplicarCupomRLI, mostrarToastRLI } = useLojaRLI();
  const [codigoRLI, setCodigoRLI] = useState<string>('');

  const aplicarRLI = () => {
    if (aplicarCupomRLI(codigoRLI)) {
      mostrarToastRLI('Cupom aplicado: 10% de desconto');
      setCodigoRLI('');
    } else {
      mostrarToastRLI('Cupom inválido');
    }
  };

  const resumoRLI = (
    <View style={estilosRLI.resumoRLI}>
      <View style={estilosRLI.cupomRLI}>
        <Ionicons name="pricetag-outline" size={20} color={corRLI.ouroEscuroRLI} />
        <TextInput
          style={estilosRLI.cupomEntradaRLI}
          placeholder={cupomRLI ? `${cupomRLI} aplicado` : 'Cupom de desconto'}
          placeholderTextColor="#A99C93"
          value={codigoRLI}
          onChangeText={setCodigoRLI}
          autoCapitalize="characters"
          editable={!cupomRLI}
        />
        {!cupomRLI && (
          <TouchableOpacity style={estilosRLI.cupomBotaoRLI} onPress={aplicarRLI}>
            <Text style={estilosRLI.cupomBotaoTextoRLI}>Aplicar</Text>
          </TouchableOpacity>
        )}
        {cupomRLI && <Ionicons name="checkmark-circle" size={22} color={corRLI.sucessoRLI} />}
      </View>
      <View style={estilosRLI.linhaResumoRLI}>
        <Text style={estilosRLI.resumoRotuloRLI}>Subtotal</Text>
        <Text style={estilosRLI.resumoValorRLI}>{formatarPrecoRLI(subtotalRLI)}</Text>
      </View>
      {descontoRLI > 0 && (
        <View style={estilosRLI.linhaResumoRLI}>
          <Text style={estilosRLI.resumoRotuloRLI}>Desconto</Text>
          <Text style={[estilosRLI.resumoValorRLI, { color: corRLI.sucessoRLI }]}>- {formatarPrecoRLI(descontoRLI)}</Text>
        </View>
      )}
      <View style={estilosRLI.linhaResumoRLI}>
        <Text style={estilosRLI.resumoRotuloRLI}>Frete</Text>
        <Text style={estilosRLI.resumoValorRLI}>{freteRLI === 0 ? 'Grátis' : formatarPrecoRLI(freteRLI)}</Text>
      </View>
      {freteRLI > 0 && <Text style={estilosRLI.dicaFreteRLI}>Frete grátis em compras acima de R$ 300,00</Text>}
    </View>
  );

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsRLI.top + 16, paddingHorizontal: 20, paddingBottom: 14 }}>
        <Text style={estilosRLI.tituloRLI}>Carrinho</Text>
        <Text style={estilosRLI.subtituloRLI}>{itensRLI.length} {itensRLI.length === 1 ? 'item' : 'itens'}</Text>
      </View>
      <FlatList
        data={itensRLI}
        keyExtractor={(iRLI) => `${iRLI.produtoRLI.idRLI}-${iRLI.tamanhoRLI}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EstadoVazioRLI iconeRLI="bag-outline" tituloRLI="Seu carrinho está vazio" textoRLI="Que tal conhecer os lançamentos da loja?" botaoRLI="Explorar peças" aoPressionarRLI={() => roteadorRLI.push('/inicio')} />}
        ListFooterComponent={itensRLI.length > 0 ? resumoRLI : null}
        renderItem={({ item: itemRLI }) => (
          <View style={estilosRLI.itemRLI}>
            <ImagemRLI fonteRLI={itemRLI.produtoRLI.imagensRLI?.[0]} compactoRLI estiloRLI={estilosRLI.miniaturaRLI} />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={estilosRLI.nomeRLI} numberOfLines={1}>{itemRLI.produtoRLI.nomeRLI}</Text>
              <Text style={estilosRLI.detalheRLI}>{itemRLI.produtoRLI.subtituloRLI} · {itemRLI.tamanhoRLI}</Text>
              <Text style={estilosRLI.precoRLI}>{formatarPrecoRLI(itemRLI.produtoRLI.precoRLI * itemRLI.quantidadeRLI)}</Text>
              <View style={estilosRLI.acoesRLI}>
                <SeletorQuantidadeRLI
                  valorRLI={itemRLI.quantidadeRLI}
                  aoDiminuirRLI={() => alterarQuantidadeRLI(itemRLI.produtoRLI.idRLI, itemRLI.tamanhoRLI, -1)}
                  aoAumentarRLI={() => alterarQuantidadeRLI(itemRLI.produtoRLI.idRLI, itemRLI.tamanhoRLI, 1)}
                />
                <TouchableOpacity onPress={() => removerRLI(itemRLI.produtoRLI.idRLI, itemRLI.tamanhoRLI)} accessibilityLabel="Remover item" style={estilosRLI.lixoRLI}>
                  <Ionicons name="trash-outline" size={20} color={corRLI.erroRLI} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {itensRLI.length > 0 && (
        <View style={estilosRLI.rodapeRLI}>
          <View>
            <Text style={estilosRLI.totalRotuloRLI}>Total</Text>
            <Text style={estilosRLI.totalRLI}>{formatarPrecoRLI(totalRLI)}</Text>
          </View>
          <BotaoRLI tituloRLI="Finalizar compra" iconeRLI="arrow-forward" aoPressionarRLI={() => roteadorRLI.push('/checkout')} estiloRLI={{ flex: 1 }} />
        </View>
      )}
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  tituloRLI: { fontSize: 30, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  subtituloRLI: { fontSize: 13, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI, marginTop: 2 },
  itemRLI: { flexDirection: 'row', gap: 14, backgroundColor: corRLI.brancoRLI, borderRadius: 22, padding: 12, marginBottom: 14, ...sombraRLI.suaveRLI },
  miniaturaRLI: { width: 92, height: 120, borderRadius: 16 },
  nomeRLI: { fontSize: 18, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
  detalheRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  precoRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroEscuroRLI },
  acoesRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  lixoRLI: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FCEDEA', alignItems: 'center', justifyContent: 'center' },
  resumoRLI: { backgroundColor: corRLI.brancoRLI, borderRadius: 22, padding: 16, gap: 12, marginTop: 4, ...sombraRLI.suaveRLI },
  cupomRLI: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: corRLI.cremeRLI, borderRadius: 14, paddingLeft: 14, paddingRight: 6, height: 50, borderWidth: 1, borderColor: corRLI.bordaRLI },
  cupomEntradaRLI: { flex: 1, height: '100%', fontSize: 14, fontFamily: fonteRLI.mediaRLI, color: corRLI.textoRLI },
  cupomBotaoRLI: { backgroundColor: corRLI.marromRLI, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10 },
  cupomBotaoTextoRLI: { fontSize: 13, fontFamily: fonteRLI.semiRLI, color: corRLI.ouroClaroRLI },
  linhaResumoRLI: { flexDirection: 'row', justifyContent: 'space-between' },
  resumoRotuloRLI: { fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  resumoValorRLI: { fontSize: 14, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI },
  dicaFreteRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.ouroEscuroRLI },
  rodapeRLI: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: corRLI.brancoRLI, ...sombraRLI.forteRLI },
  totalRotuloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: corRLI.suaveRLI },
  totalRLI: { fontSize: 22, fontFamily: fonteRLI.tituloRLI, color: corRLI.textoRLI },
});
