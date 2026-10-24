import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TamanhoRLI, ProdutoRLI } from '../data/produtosRLI';
import { corRLI, fonteRLI } from '../constants/temaRLI';

export interface UsuarioRLI {
  nomeRLI: string;
  emailRLI: string;
  senhaRLI: string;
  telefoneRLI: string;
}

export interface ItemCarrinhoRLI {
  produtoRLI: ProdutoRLI;
  tamanhoRLI: TamanhoRLI;
  quantidadeRLI: number;
}

export interface PedidoRLI {
  idRLI: string;
  dataRLI: string;
  itensRLI: ItemCarrinhoRLI[];
  totalRLI: number;
  pagamentoRLI: string;
  enderecoRLI: string;
  statusRLI: string;
}

interface LojaContextoRLI {
  prontoRLI: boolean;
  usuarioRLI: UsuarioRLI | null;
  entrarRLI: (emailRLI: string, senhaRLI: string) => string | null;
  cadastrarRLI: (nomeRLI: string, emailRLI: string, senhaRLI: string) => string | null;
  sairRLI: () => void;
  atualizarPerfilRLI: (nomeRLI: string, telefoneRLI: string) => void;
  itensRLI: ItemCarrinhoRLI[];
  quantidadeTotalRLI: number;
  adicionarRLI: (produtoRLI: ProdutoRLI, tamanhoRLI?: TamanhoRLI, quantidadeRLI?: number) => void;
  alterarQuantidadeRLI: (idRLI: string, tamanhoRLI: TamanhoRLI, deltaRLI: number) => void;
  removerRLI: (idRLI: string, tamanhoRLI: TamanhoRLI) => void;
  favoritosRLI: string[];
  alternarFavoritoRLI: (idRLI: string) => void;
  cupomRLI: string | null;
  aplicarCupomRLI: (codigoRLI: string) => boolean;
  subtotalRLI: number;
  descontoRLI: number;
  freteRLI: number;
  totalRLI: number;
  pedidosRLI: PedidoRLI[];
  finalizarPedidoRLI: (pagamentoRLI: string, enderecoRLI: string) => string;
  mostrarToastRLI: (mensagemRLI: string) => void;
}

const usuarioPadraoRLI: UsuarioRLI = {
  nomeRLI: 'Cliente',
  emailRLI: 'cliente@joias.com',
  senhaRLI: '123456',
  telefoneRLI: '',
};

const chaveUsuariosRLI = '@joias_rli:usuarios';
const chaveSessaoRLI = '@joias_rli:sessao';
const cupomValidoRLI = 'BRILHO10';

const ContextoRLI = createContext<LojaContextoRLI | null>(null);

export function LojaProviderRLI({ children: childrenRLI }: { children: ReactNode }) {
  const [prontoRLI, setProntoRLI] = useState<boolean>(false);
  const [usuariosRLI, setUsuariosRLI] = useState<UsuarioRLI[]>([usuarioPadraoRLI]);
  const [sessaoRLI, setSessaoRLI] = useState<string | null>(null);
  const [itensRLI, setItensRLI] = useState<ItemCarrinhoRLI[]>([]);
  const [favoritosRLI, setFavoritosRLI] = useState<string[]>([]);
  const [cupomRLI, setCupomRLI] = useState<string | null>(null);
  const [pedidosRLI, setPedidosRLI] = useState<PedidoRLI[]>([]);
  const [toastRLI, setToastRLI] = useState<string>('');
  const opacidadeRLI = useRef(new Animated.Value(0)).current;
  const temporizadorRLI = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const salvosRLI = await AsyncStorage.getItem(chaveUsuariosRLI);
        const sessaoSalvaRLI = await AsyncStorage.getItem(chaveSessaoRLI);
        if (salvosRLI) {
          const listaRLI: UsuarioRLI[] = JSON.parse(salvosRLI);
          setUsuariosRLI([usuarioPadraoRLI, ...listaRLI.filter((uRLI) => uRLI.emailRLI !== usuarioPadraoRLI.emailRLI)]);
        }
        if (sessaoSalvaRLI) setSessaoRLI(sessaoSalvaRLI);
      } catch {
        setUsuariosRLI([usuarioPadraoRLI]);
      }
      setProntoRLI(true);
    })();
  }, []);

  const salvarUsuariosRLI = (listaRLI: UsuarioRLI[]) => {
    setUsuariosRLI(listaRLI);
    AsyncStorage.setItem(chaveUsuariosRLI, JSON.stringify(listaRLI)).catch(() => undefined);
  };

  const usuarioRLI = usuariosRLI.find((uRLI) => uRLI.emailRLI === sessaoRLI) ?? null;

  const mostrarToastRLI = (mensagemRLI: string) => {
    setToastRLI(mensagemRLI);
    if (temporizadorRLI.current) clearTimeout(temporizadorRLI.current);
    Animated.timing(opacidadeRLI, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    temporizadorRLI.current = setTimeout(() => {
      Animated.timing(opacidadeRLI, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    }, 2200);
  };

  const entrarRLI = (emailRLI: string, senhaRLI: string): string | null => {
    const emailLimpoRLI = emailRLI.trim().toLowerCase();
    if (emailLimpoRLI === '' || senhaRLI === '') return 'Preencha o e-mail e a senha para entrar.';
    const encontradoRLI = usuariosRLI.find((uRLI) => uRLI.emailRLI === emailLimpoRLI);
    if (!encontradoRLI) return 'E-mail incorreto. Confira ou crie uma conta.';
    if (encontradoRLI.senhaRLI !== senhaRLI) return 'Senha incorreta. Tente novamente.';
    setSessaoRLI(encontradoRLI.emailRLI);
    AsyncStorage.setItem(chaveSessaoRLI, encontradoRLI.emailRLI).catch(() => undefined);
    return null;
  };

  const cadastrarRLI = (nomeRLI: string, emailRLI: string, senhaRLI: string): string | null => {
    const emailLimpoRLI = emailRLI.trim().toLowerCase();
    if (usuariosRLI.some((uRLI) => uRLI.emailRLI === emailLimpoRLI)) return 'Este e-mail já está cadastrado.';
    const novoRLI: UsuarioRLI = { nomeRLI: nomeRLI.trim(), emailRLI: emailLimpoRLI, senhaRLI, telefoneRLI: '' };
    salvarUsuariosRLI([...usuariosRLI, novoRLI]);
    setSessaoRLI(novoRLI.emailRLI);
    AsyncStorage.setItem(chaveSessaoRLI, novoRLI.emailRLI).catch(() => undefined);
    return null;
  };

  const sairRLI = () => {
    setSessaoRLI(null);
    setItensRLI([]);
    setCupomRLI(null);
    AsyncStorage.removeItem(chaveSessaoRLI).catch(() => undefined);
  };

  const atualizarPerfilRLI = (nomeRLI: string, telefoneRLI: string) => {
    salvarUsuariosRLI(
      usuariosRLI.map((uRLI) => (uRLI.emailRLI === sessaoRLI ? { ...uRLI, nomeRLI: nomeRLI.trim(), telefoneRLI } : uRLI))
    );
  };

  const adicionarRLI = (produtoRLI: ProdutoRLI, tamanhoRLI: TamanhoRLI = 'M', quantidadeRLI: number = 1) => {
    setItensRLI((anteriorRLI) => {
      const existeRLI = anteriorRLI.some((iRLI) => iRLI.produtoRLI.idRLI === produtoRLI.idRLI && iRLI.tamanhoRLI === tamanhoRLI);
      if (existeRLI) {
        return anteriorRLI.map((iRLI) =>
          iRLI.produtoRLI.idRLI === produtoRLI.idRLI && iRLI.tamanhoRLI === tamanhoRLI
            ? { ...iRLI, quantidadeRLI: iRLI.quantidadeRLI + quantidadeRLI }
            : iRLI
        );
      }
      return [...anteriorRLI, { produtoRLI, tamanhoRLI, quantidadeRLI }];
    });
  };

  const alterarQuantidadeRLI = (idRLI: string, tamanhoRLI: TamanhoRLI, deltaRLI: number) => {
    setItensRLI((anteriorRLI) =>
      anteriorRLI
        .map((iRLI) =>
          iRLI.produtoRLI.idRLI === idRLI && iRLI.tamanhoRLI === tamanhoRLI
            ? { ...iRLI, quantidadeRLI: iRLI.quantidadeRLI + deltaRLI }
            : iRLI
        )
        .filter((iRLI) => iRLI.quantidadeRLI > 0)
    );
  };

  const removerRLI = (idRLI: string, tamanhoRLI: TamanhoRLI) =>
    setItensRLI((anteriorRLI) => anteriorRLI.filter((iRLI) => !(iRLI.produtoRLI.idRLI === idRLI && iRLI.tamanhoRLI === tamanhoRLI)));

  const alternarFavoritoRLI = (idRLI: string) =>
    setFavoritosRLI((anteriorRLI) =>
      anteriorRLI.includes(idRLI) ? anteriorRLI.filter((fRLI) => fRLI !== idRLI) : [...anteriorRLI, idRLI]
    );

  const aplicarCupomRLI = (codigoRLI: string): boolean => {
    if (codigoRLI.trim().toUpperCase() === cupomValidoRLI) {
      setCupomRLI(cupomValidoRLI);
      return true;
    }
    return false;
  };

  const quantidadeTotalRLI = itensRLI.reduce((somaRLI, iRLI) => somaRLI + iRLI.quantidadeRLI, 0);
  const subtotalRLI = itensRLI.reduce(
    (somaRLI, iRLI) => somaRLI + iRLI.produtoRLI.precoRLI * iRLI.quantidadeRLI,
    0
  );
  const descontoRLI = cupomRLI ? subtotalRLI * 0.1 : 0;
  const freteRLI = itensRLI.length === 0 || subtotalRLI >= 300 ? 0 : 19.9;
  const totalRLI = subtotalRLI - descontoRLI + freteRLI;

  const finalizarPedidoRLI = (pagamentoRLI: string, enderecoRLI: string): string => {
    const idRLI = String(Date.now()).slice(-6);
    const novoRLI: PedidoRLI = {
      idRLI,
      dataRLI: new Date().toLocaleDateString('pt-BR'),
      itensRLI,
      totalRLI,
      pagamentoRLI,
      enderecoRLI,
      statusRLI: 'Em preparação',
    };
    setPedidosRLI((anteriorRLI) => [novoRLI, ...anteriorRLI]);
    setItensRLI([]);
    setCupomRLI(null);
    return idRLI;
  };

  return (
    <ContextoRLI.Provider
      value={{
        prontoRLI, usuarioRLI, entrarRLI, cadastrarRLI, sairRLI, atualizarPerfilRLI,
        itensRLI, quantidadeTotalRLI, adicionarRLI, alterarQuantidadeRLI, removerRLI,
        favoritosRLI, alternarFavoritoRLI, cupomRLI, aplicarCupomRLI,
        subtotalRLI, descontoRLI, freteRLI, totalRLI, pedidosRLI, finalizarPedidoRLI, mostrarToastRLI,
      }}
    >
      {childrenRLI}
      <Animated.View pointerEvents="none" style={[estilosRLI.toastRLI, { opacity: opacidadeRLI }]}>
        <Text style={estilosRLI.toastTextoRLI}>{toastRLI}</Text>
      </Animated.View>
    </ContextoRLI.Provider>
  );
}

export function useLojaRLI(): LojaContextoRLI {
  const contextoRLI = useContext(ContextoRLI);
  if (!contextoRLI) throw new Error('useLojaRLI deve ser usado dentro de LojaProviderRLI');
  return contextoRLI;
}

const estilosRLI = StyleSheet.create({
  toastRLI: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 96,
    alignItems: 'center',
  },
  toastTextoRLI: {
    backgroundColor: corRLI.espressoRLI,
    color: corRLI.brancoRLI,
    fontFamily: fonteRLI.mediaRLI,
    fontSize: 13,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
