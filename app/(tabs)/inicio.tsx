import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListRLI from '../../components/ProductList';
import CategoriaChipsRLI from '../../components/CategoriaChips';
import EstadoVazioRLI from '../../components/EstadoVazio';
import { OrdemRLI, filtrosRLI, filtrarPorChipRLI, ordenarRLI, ordensRLI, produtosRLI } from '../../data/produtosRLI';
import { useLojaRLI } from '../../context/LojaRLI';
import { corRLI, fonteRLI, sombraRLI } from '../../constants/temaRLI';

export default function InicioRLI() {
  const roteadorRLI = useRouter();
  const insetsRLI = useSafeAreaInsets();
  const { usuarioRLI } = useLojaRLI();
  const [buscaRLI, setBuscaRLI] = useState<string>('');
  const [filtroRLI, setFiltroRLI] = useState<string>(filtrosRLI[0]);
  const [ordemRLI, setOrdemRLI] = useState<OrdemRLI>('relevancia');
  const [ordenarAbertoRLI, setOrdenarAbertoRLI] = useState<boolean>(false);

  const listaRLI = useMemo(() => {
    const termoRLI = buscaRLI.trim().toLowerCase();
    const filtradaRLI = produtosRLI.filter(
      (pRLI) => filtrarPorChipRLI(pRLI, filtroRLI) && (termoRLI === '' || `${pRLI.nomeRLI} ${pRLI.subtituloRLI}`.toLowerCase().includes(termoRLI))
    );
    return ordenarRLI(filtradaRLI, ordemRLI);
  }, [buscaRLI, filtroRLI, ordemRLI]);

  return (
    <View style={estilosRLI.telaRLI}>
      <StatusBar style="light" />
      <View style={[estilosRLI.topoRLI, { paddingTop: insetsRLI.top + 18 }]}>
        <View style={estilosRLI.linhaTopoRLI}>
          <View>
            <Text style={estilosRLI.rotuloRLI}>Entregar em</Text>
            <View style={estilosRLI.localRLI}>
              <Text style={estilosRLI.localTextoRLI}>Manaus, AM</Text>
              <Ionicons name="chevron-down" size={16} color={corRLI.brancoRLI} />
            </View>
          </View>
          <View style={estilosRLI.acoesRLI}>
            <TouchableOpacity style={estilosRLI.sinoRLI} onPress={() => roteadorRLI.push('/notificacoes')} accessibilityLabel="Notificações">
              <Ionicons name="notifications-outline" size={22} color={corRLI.brancoRLI} />
              <View style={estilosRLI.sinoPontoRLI} />
            </TouchableOpacity>
            <TouchableOpacity style={estilosRLI.avatarRLI} onPress={() => roteadorRLI.push('/perfil')} accessibilityLabel="Perfil">
              <Text style={estilosRLI.avatarTextoRLI}>{(usuarioRLI?.nomeRLI ?? 'C').charAt(0).toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={estilosRLI.buscaRLI}>
        <Ionicons name="search-outline" size={24} color={corRLI.textoRLI} />
        <TextInput
          style={estilosRLI.buscaEntradaRLI}
          placeholder="Buscar joias e acessórios"
          placeholderTextColor={corRLI.suaveRLI}
          value={buscaRLI}
          onChangeText={setBuscaRLI}
        />
        <TouchableOpacity style={estilosRLI.filtroRLI} activeOpacity={0.85} onPress={() => setOrdenarAbertoRLI(true)} accessibilityLabel="Ordenar">
          <Ionicons name="options-outline" size={22} color={corRLI.brancoRLI} />
        </TouchableOpacity>
      </View>

      <ProductListRLI
        produtosRLI={listaRLI}
        aoAbrirRLI={(idRLI) => roteadorRLI.push({ pathname: '/produto/[id]', params: { id: idRLI } })}
        cabecalhoRLI={
          <View style={{ marginHorizontal: -20 }}>
            <CategoriaChipsRLI opcoesRLI={filtrosRLI} selecionadaRLI={filtroRLI} aoSelecionarRLI={setFiltroRLI} />
          </View>
        }
        vazioRLI={<EstadoVazioRLI iconeRLI="search-outline" tituloRLI="Nada encontrado" textoRLI="Tente buscar por outro nome ou mude o filtro." botaoRLI="Limpar filtros" aoPressionarRLI={() => { setBuscaRLI(''); setFiltroRLI('Todos'); }} />}
      />

      <Modal visible={ordenarAbertoRLI} transparent animationType="slide" onRequestClose={() => setOrdenarAbertoRLI(false)}>
        <Pressable style={estilosRLI.fundoModalRLI} onPress={() => setOrdenarAbertoRLI(false)}>
          <Pressable style={estilosRLI.folhaRLI} onPress={() => undefined}>
            <View style={estilosRLI.alcaRLI} />
            <Text style={estilosRLI.folhaTituloRLI}>Ordenar por</Text>
            {ordensRLI.map((oRLI) => {
              const ativaRLI = oRLI.chaveRLI === ordemRLI;
              return (
                <TouchableOpacity key={oRLI.chaveRLI} style={[estilosRLI.opcaoRLI, ativaRLI && estilosRLI.opcaoAtivaRLI]} onPress={() => { setOrdemRLI(oRLI.chaveRLI); setOrdenarAbertoRLI(false); }}>
                  <Text style={[estilosRLI.opcaoTextoRLI, ativaRLI && { fontFamily: fonteRLI.semiRLI, color: corRLI.ouroEscuroRLI }]}>{oRLI.rotuloRLI}</Text>
                  {ativaRLI && <Ionicons name="checkmark-circle" size={22} color={corRLI.ouroRLI} />}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const estilosRLI = StyleSheet.create({
  telaRLI: { flex: 1, backgroundColor: corRLI.fundoRLI },
  topoRLI: { backgroundColor: corRLI.escuroRLI, paddingHorizontal: 20, paddingBottom: 50 },
  linhaTopoRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotuloRLI: { fontSize: 12, fontFamily: fonteRLI.regularRLI, color: '#B8B4CE' },
  localRLI: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  localTextoRLI: { fontSize: 15, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  acoesRLI: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sinoRLI: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  sinoPontoRLI: { position: 'absolute', top: 11, right: 12, width: 9, height: 9, borderRadius: 5, backgroundColor: corRLI.cobreRLI },
  avatarRLI: { width: 46, height: 46, borderRadius: 23, backgroundColor: corRLI.ouroRLI, alignItems: 'center', justifyContent: 'center' },
  avatarTextoRLI: { fontSize: 18, fontFamily: fonteRLI.semiRLI, color: corRLI.brancoRLI },
  buscaRLI: {
    flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, marginTop: -29, marginHorizontal: 20,
    backgroundColor: corRLI.brancoRLI, borderRadius: 18, paddingLeft: 16, paddingRight: 7, zIndex: 2, ...sombraRLI.forteRLI,
  },
  buscaEntradaRLI: { flex: 1, height: '100%', fontSize: 14, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
  filtroRLI: { width: 44, height: 44, borderRadius: 13, backgroundColor: corRLI.cobreRLI, alignItems: 'center', justifyContent: 'center' },
  fundoModalRLI: { flex: 1, backgroundColor: 'rgba(20,18,43,0.5)', justifyContent: 'flex-end' },
  folhaRLI: { backgroundColor: corRLI.brancoRLI, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 36 },
  alcaRLI: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: corRLI.bordaRLI, marginBottom: 18 },
  folhaTituloRLI: { fontSize: 20, fontFamily: fonteRLI.semiRLI, color: corRLI.textoRLI, marginBottom: 10 },
  opcaoRLI: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 14, borderRadius: 14 },
  opcaoAtivaRLI: { backgroundColor: corRLI.cremeRLI },
  opcaoTextoRLI: { fontSize: 15, fontFamily: fonteRLI.regularRLI, color: corRLI.textoRLI },
});
