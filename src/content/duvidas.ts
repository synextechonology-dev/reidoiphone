// Dúvidas. Texto copiado da prévia.
// Trechos { tbc } são PENDENTES (o Felipe precisa confirmar) e saem com o marcador tracejado.

export type Trecho = string | { tbc: string };

export const duvidas: { pergunta: string; resposta: Trecho[] }[] = [
  {
    pergunta: "Qual a diferença entre novo e seminovo?",
    resposta: [
      "O novo vem ",
      { tbc: "lacrado" },
      ", com bateria em 100%. O seminovo já teve outro dono e passa pela conferência da loja. A vitrine mostra a saúde da bateria de cada um.",
    ],
  },
  {
    pergunta: "O iPhone 18 já está à venda?",
    resposta: [
      'O iPhone 18 Pro e o 18 Pro Max, sim. O iPhone 18 tem lançamento previsto para 2027. Toque em "Avise quando chegar" na vitrine e a loja te chama.',
    ],
  },
  {
    pergunta: "Os seminovos têm garantia?",
    resposta: ["Sim. Todo aparelho sai da loja com garantia de ", { tbc: "X meses" }, "."],
  },
  {
    pergunta: "Como sei a saúde da bateria?",
    resposta: [
      "Ela aparece em cada seminovo da vitrine. É o mesmo número que o iPhone mostra em Ajustes, Bateria.",
    ],
  },
  {
    pergunta: "Vocês aceitam meu iPhone usado na troca?",
    resposta: ["No momento, não trabalhamos com troca."],
  },
  {
    pergunta: "Quais as formas de pagamento?",
    resposta: ["Pix à vista ou cartão de crédito em até ", { tbc: "12x" }, "."],
  },
  {
    pergunta: "Vocês entregam?",
    resposta: ["Sim, em Santa Cruz do Rio Pardo. Se preferir, é só retirar na loja."],
  },
];
