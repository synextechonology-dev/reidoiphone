// Avaliações REAIS do Google (docs/pendencias.md, "Já real"). Não alterar sem pedir.

export type Avaliacao = {
  autor: string;
  quando: string;
  texto: string;
  estrelas: 5;
};

export const avaliacoes: Avaliacao[] = [
  {
    autor: "Paulo B.",
    quando: "no Google, há 3 anos",
    estrelas: 5,
    texto:
      "O que me fez decidir pela compra, foi excelente atendimento, agilidade na entrega e pós compra muito atenção para explicar e transferir as informações, pós venda também. Estou muito satisfeito com aparelho e mais ainda com atendimento, RECOMENDO. 👍🏻👏👏👏👏",
  },
  {
    autor: "Kamilin F.",
    quando: "no Google, há 3 anos",
    estrelas: 5,
    texto: "Não tenho nem palavras pra descrever o atendimento. Maravilhoso!! Super recomendo",
  },
  {
    autor: "Dantieli G.",
    quando: "no Google, há 3 anos",
    estrelas: 5,
    texto: "Produtos originais e de qualidade.",
  },
];
