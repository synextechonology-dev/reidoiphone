// Dados da loja. Itens marcados com PENDENTE precisam ser confirmados com o Felipe
// (lista completa em docs/pendencias.md). Enquanto estiverem pendentes, o site
// os mostra com o marcador tracejado (classe .tbc).

export const site = {
  nome: "Rei do iPhone",
  // PENDENTE: endereço (domínio) definitivo do site, por conta do cliente. Pode vir da variável
  // NEXT_PUBLIC_SITE_URL na Vercel. Usado no sitemap, no robots e nos dados estruturados.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://reidoiphone.com.br").replace(/\/$/, ""),

  descricao:
    "Loja de iPhones novos e seminovos em Santa Cruz do Rio Pardo (SP), com bateria informada e atendimento pelo WhatsApp.",

  // PENDENTE: número do WhatsApp (só dígitos, com 55 + DDD). Vazio: os links abrem sem número.
  whatsapp: "",
  // Texto exibido no site enquanto o número real não chega. PENDENTE.
  whatsappExibido: "(14) 9 0000-0000",

  // Real (docs/pendencias.md, "Já real")
  endereco: {
    rua: "R. Frediano Colli, 315, Vila Oitenta",
    cidade: "Santa Cruz do Rio Pardo",
    uf: "SP",
  },

  // PENDENTE: horário de funcionamento
  horario: ["Seg. a sex., 9h às 18h", "Sáb., 9h às 13h"],

  // PENDENTE: CNPJ (rodapé e política de privacidade)
  cnpj: "00.000.000/0001-00",

  // PENDENTE: Instagram (@). Vazio: o rodapé mostra "@ a confirmar".
  instagram: "",

  // Real
  google: {
    perfil: "https://www.google.com/maps?cid=12568105426326935106",
    nota: "5,0",
    avaliacoes: 10,
  },

  mensagemPadrao: "Olá! Vim pelo site do Rei do iPhone.",
} as const;

// Quais textos ainda são pendentes (usado para pintar o marcador .tbc)
export const pendente = {
  whatsapp: site.whatsapp === "",
  instagram: site.instagram === "",
} as const;
