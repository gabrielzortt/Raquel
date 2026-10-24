# Lumine – Loja de Joias Tecnológicas e Acessórios Inteligentes

App mobile feito com React Native + Expo Router (Stack + Tabs), TSX e StyleSheet, para a P2 de Programação para Dispositivos Móveis 1.

🌐 **Versão web:** https://gabrielzortt.github.io/Raquel/

## Executar
```bash
npm install
npx expo start
```

**Conta de teste (já cadastrada no código):** `cliente@joias.com` / `123456`
Também é possível criar uma conta nova na tela de cadastro.

## Telas
| Rota | Tela |
|---|---|
| `app/index.tsx` | Boas-vindas em carrossel (deslizável, com indicador de página) |
| `app/login.tsx` | Login (campos vazios, e-mail incorreto e senha incorreta) |
| `app/cadastro.tsx` | Criar conta |
| `app/(tabs)/inicio.tsx` | Início: busca, filtros por categoria, ordenação e lista de produtos |
| `app/(tabs)/favoritos.tsx` | Favoritos |
| `app/(tabs)/carrinho.tsx` | Carrinho com quantidade, cupom (`BRILHO10`), frete e total |
| `app/(tabs)/perfil.tsx` | Perfil e menu da conta |
| `app/produto/[id].tsx` | Detalhes do produto e botão Buy Now |
| `app/checkout.tsx`, `app/pedido-confirmado.tsx`, `app/pedidos.tsx` | Compra e histórico |
| `app/notificacoes.tsx`, `app/editar-perfil.tsx`, `app/sobre.tsx` | Telas de apoio |

## Imagens
Onde aparece **(imagem aqui)** há um espaço reservado. Para colocar uma foto, salve em `assets/images/` e preencha `imagensRLI` do produto em `data/produtosRLI.ts`:
`imagensRLI: [require('../assets/images/anel-orbit.jpg')]`

## Estrutura
- `components/` – `ProductCard`, `ProductList`, `CategoriaChips`, `ImagemRLI`, `BotaoRLI`, `CampoRLI`, `CabecalhoRLI`, `SeletorQuantidade`, `EstadoVazio`, `ConfirmarModal`
- `data/produtosRLI.ts` – servidor local simulado (mock)
- `context/LojaRLI.tsx` – estado global: usuários, carrinho, favoritos, cupom e pedidos
- `constants/temaRLI.ts` – cores, fontes e sombras

Todas as variáveis, funções e estados levam o sufixo **RLI** (Raquel, Larissa, Isabelle).
