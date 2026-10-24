import { ImageSourcePropType } from 'react-native';

export type CategoriaRLI = 'Anéis' | 'Pulseiras' | 'Colares' | 'Relógios' | 'Brincos' | 'Acessórios';
export type TamanhoRLI = 'P' | 'M' | 'G';
export type OrdemRLI = 'relevancia' | 'menor' | 'maior' | 'nota';

export interface ProdutoRLI {
  idRLI: string;
  nomeRLI: string;
  subtituloRLI: string;
  categoriaRLI: CategoriaRLI;
  precoRLI: number;
  notaRLI: number;
  avaliacoesRLI: number;
  novoRLI: boolean;
  materialRLI: string;
  conexaoRLI: string;
  bateriaRLI: string;
  garantiaRLI: string;
  descricaoRLI: string;
  imagensRLI?: ImageSourcePropType[];
}

export const filtrosRLI: string[] = ['Todos', 'Anéis', 'Pulseiras', 'Colares', 'Relógios', 'Brincos', 'Acessórios'];

export const tamanhosRLI: TamanhoRLI[] = ['P', 'M', 'G'];

export const nomeTamanhoRLI: Record<TamanhoRLI, string> = {
  P: 'Pequeno',
  M: 'Médio',
  G: 'Grande',
};

export const ordensRLI: { chaveRLI: OrdemRLI; rotuloRLI: string }[] = [
  { chaveRLI: 'relevancia', rotuloRLI: 'Relevância' },
  { chaveRLI: 'menor', rotuloRLI: 'Menor preço' },
  { chaveRLI: 'maior', rotuloRLI: 'Maior preço' },
  { chaveRLI: 'nota', rotuloRLI: 'Melhor avaliação' },
];

export const produtosRLI: ProdutoRLI[] = [
  {
    idRLI: '1', nomeRLI: 'Anel Orbit', subtituloRLI: 'Anel inteligente NFC', categoriaRLI: 'Anéis',
    precoRLI: 389.9, notaRLI: 4.8, avaliacoesRLI: 1240, novoRLI: false,
    materialRLI: 'Titânio', conexaoRLI: 'NFC', bateriaRLI: '7 dias', garantiaRLI: '12 meses',
    descricaoRLI: 'Anel de titânio com chip NFC embutido. Aproxime do celular para pagar, abrir portas e compartilhar contatos sem tirar a joia do dedo. Resistente à água e confortável para usar o dia inteiro.',
  },
  {
    idRLI: '2', nomeRLI: 'Pulseira Aura', subtituloRLI: 'Monitor de saúde', categoriaRLI: 'Pulseiras',
    precoRLI: 259.9, notaRLI: 4.7, avaliacoesRLI: 980, novoRLI: true,
    materialRLI: 'Aço inox', conexaoRLI: 'Bluetooth 5.2', bateriaRLI: '10 dias', garantiaRLI: '12 meses',
    descricaoRLI: 'Pulseira delicada que acompanha batimentos, sono e passos. Os dados aparecem no aplicativo e você recebe lembretes de movimento. Design discreto, combina com qualquer ocasião.',
  },
  {
    idRLI: '3', nomeRLI: 'Colar Luma', subtituloRLI: 'Colar com LED', categoriaRLI: 'Colares',
    precoRLI: 179.9, notaRLI: 4.5, avaliacoesRLI: 640, novoRLI: false,
    materialRLI: 'Prata 925', conexaoRLI: 'Bluetooth', bateriaRLI: '3 dias', garantiaRLI: '6 meses',
    descricaoRLI: 'Colar de prata com pingente que brilha em várias cores. Você escolhe a cor e o efeito pelo celular. Perfeito para festas e para quem gosta de uma joia diferente.',
  },
  {
    idRLI: '4', nomeRLI: 'Nova Rosé', subtituloRLI: 'Smartwatch ouro rosé', categoriaRLI: 'Relógios',
    precoRLI: 899, notaRLI: 4.9, avaliacoesRLI: 2330, novoRLI: false,
    materialRLI: 'Aço banhado', conexaoRLI: 'Bluetooth e Wi-Fi', bateriaRLI: '5 dias', garantiaRLI: '24 meses',
    descricaoRLI: 'Relógio inteligente com acabamento ouro rosé e tela AMOLED. Mostra notificações, mede exercícios e atende chamadas. Acompanha duas pulseiras para trocar quando quiser.',
  },
  {
    idRLI: '5', nomeRLI: 'Brinco Pulse', subtituloRLI: 'Fone Bluetooth em brinco', categoriaRLI: 'Brincos',
    precoRLI: 329, notaRLI: 4.4, avaliacoesRLI: 410, novoRLI: true,
    materialRLI: 'Zircônia e aço', conexaoRLI: 'Bluetooth 5.3', bateriaRLI: '6 horas', garantiaRLI: '12 meses',
    descricaoRLI: 'Par de brincos com fone de ouvido embutido. Ouça música e atenda ligações com estilo. Vem com estojo carregador em formato de caixinha de joias.',
  },
  {
    idRLI: '6', nomeRLI: 'Pingente Track', subtituloRLI: 'Rastreador GPS', categoriaRLI: 'Acessórios',
    precoRLI: 149.9, notaRLI: 4.6, avaliacoesRLI: 770, novoRLI: false,
    materialRLI: 'Liga metálica', conexaoRLI: 'GPS e Bluetooth', bateriaRLI: '30 dias', garantiaRLI: '12 meses',
    descricaoRLI: 'Pingente pequeno que ajuda a encontrar chaves, bolsa ou até a sua mochila. Toque no aplicativo e ele emite um som. Pode ser preso em colar, chaveiro ou bolsa.',
  },
  {
    idRLI: '7', nomeRLI: 'Anel Spark', subtituloRLI: 'Anel de notificações', categoriaRLI: 'Anéis',
    precoRLI: 299, notaRLI: 4.3, avaliacoesRLI: 355, novoRLI: false,
    materialRLI: 'Aço inox', conexaoRLI: 'Bluetooth', bateriaRLI: '5 dias', garantiaRLI: '6 meses',
    descricaoRLI: 'Anel que vibra e acende uma luz sutil quando chega mensagem ou ligação. Ideal para quem não quer ficar olhando o celular o tempo todo. Disponível em três tamanhos.',
  },
  {
    idRLI: '8', nomeRLI: 'Pulseira Charm', subtituloRLI: 'Pingentes digitais', categoriaRLI: 'Pulseiras',
    precoRLI: 219.9, notaRLI: 4.6, avaliacoesRLI: 520, novoRLI: true,
    materialRLI: 'Aço e cristais', conexaoRLI: 'Bluetooth', bateriaRLI: '8 dias', garantiaRLI: '12 meses',
    descricaoRLI: 'Pulseira com pingentes que mostram ícones diferentes na tela pequena. Escolha o seu favorito pelo aplicativo e troque sempre que quiser. Um jeito moderno de usar charms.',
  },
];

export const buscarProdutoPorIdRLI = (idRLI: string): ProdutoRLI | undefined =>
  produtosRLI.find((itemRLI) => itemRLI.idRLI === idRLI);

export const filtrarPorChipRLI = (produtoRLI: ProdutoRLI, chipRLI: string): boolean =>
  chipRLI === 'Todos' || produtoRLI.categoriaRLI === chipRLI;

export const ordenarRLI = (listaRLI: ProdutoRLI[], ordemRLI: OrdemRLI): ProdutoRLI[] => {
  const copiaRLI = [...listaRLI];
  if (ordemRLI === 'menor') return copiaRLI.sort((aRLI, bRLI) => aRLI.precoRLI - bRLI.precoRLI);
  if (ordemRLI === 'maior') return copiaRLI.sort((aRLI, bRLI) => bRLI.precoRLI - aRLI.precoRLI);
  if (ordemRLI === 'nota') return copiaRLI.sort((aRLI, bRLI) => bRLI.notaRLI - aRLI.notaRLI);
  return copiaRLI;
};

export const formatarPrecoRLI = (valorRLI: number): string =>
  `R$ ${valorRLI.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const formatarAvaliacoesRLI = (valorRLI: number): string =>
  valorRLI.toLocaleString('pt-BR');
