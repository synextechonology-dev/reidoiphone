// "Leve junto". Copiado de `const ACC` da prévia.
// PENDENTE: acessórios e preços são EXEMPLO até o Felipe confirmar.

import type { Aparelho } from "./aparelhos";

export type Acessorio = {
  id: string;
  nome: string;
  desc: string;
  /** preço em reais (EXEMPLO) */
  v: number;
};

export const acessorios = (a: Pick<Aparelho, "con">): Acessorio[] => [
  { id: "capa", nome: "Capa com MagSafe", desc: "Protege e encaixa no carregador magnético", v: 149 },
  { id: "pel", nome: "Película de vidro", desc: "Aplicada na loja, na hora", v: 59 },
  { id: "fonte", nome: "Fonte USB-C 20 W", desc: "O iPhone vem sem carregador na caixa", v: 129 },
  {
    id: "cabo",
    nome: a.con === "USB-C" ? "Cabo USB-C extra" : "Cabo USB-C para Lightning",
    desc: "Para deixar um no carro ou no trabalho",
    v: 89,
  },
];
