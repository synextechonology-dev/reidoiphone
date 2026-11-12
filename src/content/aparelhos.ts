// Modelos, specs, cores, novos (GB e preço) e seminovos (unidade a unidade).
// Copiado de `const M` e `CORES` da prévia.
//
// ATENÇÃO: as specs são oficiais da Apple. PREÇOS, UNIDADES (cor, GB, bateria),
// CORES DISPONÍVEIS e ESTOQUE são EXEMPLO até o Felipe passar o estoque real.

/** Cor de exibição de cada acabamento (bolinha e desenho do aparelho). */
export const CORES: Record<string, string> = {
  Preto: "#2E2E30",
  Azul: "#D3DCE0",
  Verde: "#CBD5C5",
  Amarelo: "#EDE6C8",
  Rosa: "#EBCFD2",
  Branco: "#F2F2F0",
  "Rosa vivo": "#EFB2D6",
  "Verde-acinzentado": "#AFD2CF",
  Ultramarino: "#9AACF4",
  Lavanda: "#DCCDE8",
  "Azul-névoa": "#9AB0D0",
  Sálvia: "#AAB78C",
  Prata: "#D9DADC",
  Glacial: "#A8C0DA",
  Bordô: "#6B2232",
  "Meia-noite": "#22252C",
  Estelar: "#ECE6DA",
  "Azul-escuro": "#34506E",
  Roxo: "#BBA9CC",
  "Titânio natural": "#B9B3A8",
  "Titânio azul": "#3E4656",
  Grafite: "#4A4A4D",
  Dourado: "#E9DCC4",
  "Azul-pacífico": "#2E4A5E",
  "Azul-sierra": "#9CB6CF",
  "Verde-alpino": "#56685A",
  "Roxo-profundo": "#5B4C63",
  "Preto-espacial": "#3B3A3C",
  "Titânio branco": "#E8E6E1",
  "Titânio preto": "#3A3A3C",
  "Titânio deserto": "#C9B49A",
  "Prata-claro": "#E3E4E5",
};

/**
 * Fotos reais, por "id|cor" (mesma chave da prévia). Onde não houver foto,
 * os cards usam o desenho do aparelho. Arquivos em public/fotos/.
 */
export const fotos: Record<string, { costas: string; w: number; h: number }> = {
  "15|Preto": { costas: "/fotos/iphone-15-preto-costas.webp", w: 156, h: 312 },
};

/** Um aparelho seminovo em estoque. EXEMPLO. */
export type Unidade = {
  gb: number;
  cor: string;
  /** saúde da bateria, em % */
  bat: number;
  /** preço no Pix, em reais */
  p: number;
};

export type Aparelho = {
  /** id curto usado na prévia (ex.: "13p") */
  id: string;
  /** endereço da página: /iphone/[slug] */
  slug: string;
  nome: string;
  pro: boolean;
  /** "Em breve": ainda não lançado */
  soon?: boolean;
  /** tag de lançamento */
  lanc?: boolean;
  tela?: string;
  chip?: string;
  cam?: string;
  arm?: string;
  con?: "USB-C" | "Lightning";
  dest: string;
  /** novo lacrado: cores e [GB, preço]. Preços EXEMPLO. */
  novo?: { cores: string[]; gb: [number, number][] };
  /** seminovos: uma entrada por aparelho físico. EXEMPLO. */
  semi?: Unidade[];
};

// Ordem = ordem dos modelos na prévia (MODELOS).
export const aparelhos: Aparelho[] = [
  {
    id: "15",
    slug: "iphone-15",
    nome: "iPhone 15",
    pro: false,
    tela: '6,1" Super Retina XDR',
    chip: "A16 Bionic",
    cam: "48 MP + ultra-angular 12 MP",
    arm: "128, 256 ou 512 GB",
    con: "USB-C",
    dest: "Dynamic Island e USB-C",
    novo: {
      cores: ["Preto", "Azul", "Verde", "Rosa"],
      gb: [
        [128, 4299],
        [256, 4999],
      ],
    },
    semi: [{ gb: 128, cor: "Rosa", bat: 95, p: 3899 }],
  },
  {
    id: "16",
    slug: "iphone-16",
    nome: "iPhone 16",
    pro: false,
    tela: '6,1" Super Retina XDR',
    chip: "A18",
    cam: "48 MP + ultra-angular 12 MP",
    arm: "128, 256 ou 512 GB",
    con: "USB-C",
    dest: "Botão Controle da Câmera",
    novo: {
      cores: ["Preto", "Branco", "Verde-acinzentado", "Ultramarino"],
      gb: [
        [128, 5199],
        [256, 5899],
        [512, 7199],
      ],
    },
    semi: [{ gb: 128, cor: "Branco", bat: 96, p: 4399 }],
  },
  {
    id: "17",
    slug: "iphone-17",
    nome: "iPhone 17",
    pro: false,
    tela: '6,3" ProMotion até 120 Hz',
    chip: "A19",
    cam: "48 MP + ultra-angular 48 MP",
    arm: "256 ou 512 GB",
    con: "USB-C",
    dest: "Tela de 120 Hz no modelo de entrada",
    novo: {
      cores: ["Preto", "Lavanda", "Azul-névoa", "Sálvia"],
      gb: [
        [256, 7299],
        [512, 8799],
      ],
    },
  },
  {
    id: "18",
    slug: "iphone-18",
    nome: "iPhone 18",
    pro: false,
    soon: true,
    dest: "Lançamento previsto para 2027",
    novo: { cores: ["Preto"], gb: [] },
  },
  {
    id: "18p",
    slug: "iphone-18-pro",
    nome: "iPhone 18 Pro",
    pro: true,
    lanc: true,
    // PENDENTE: confirmar a tela de 6,3" em fonte oficial
    tela: '6,3" ProMotion',
    chip: "A20 Pro, 2 nm",
    cam: "48 MP com abertura variável + ultra-angular 48 MP + tele 48 MP 4x",
    arm: "256 GB a 2 TB",
    con: "USB-C",
    dest: "Primeira câmera de iPhone com abertura variável",
    novo: {
      cores: ["Bordô", "Prata", "Glacial", "Preto"],
      gb: [
        [256, 11499],
        [512, 12999],
        [1024, 14999],
        [2048, 17999],
      ],
    },
  },
  {
    id: "18pm",
    slug: "iphone-18-pro-max",
    nome: "iPhone 18 Pro Max",
    pro: true,
    lanc: true,
    tela: '6,9" ProMotion',
    chip: "A20 Pro, 2 nm",
    cam: "48 MP com abertura variável + ultra-angular 48 MP + tele 48 MP 4x",
    arm: "256 GB a 2 TB",
    con: "USB-C",
    dest: 'A maior tela da linha, 6,9"',
    novo: {
      cores: ["Bordô", "Prata", "Glacial", "Preto"],
      gb: [
        [256, 12999],
        [512, 14499],
        [1024, 16499],
        [2048, 19499],
      ],
    },
  },
  {
    id: "12",
    slug: "iphone-12",
    nome: "iPhone 12",
    pro: false,
    tela: '6,1" Super Retina XDR',
    chip: "A14 Bionic",
    cam: "12 MP + ultra-angular 12 MP",
    arm: "64, 128 ou 256 GB",
    con: "Lightning",
    dest: "Primeiro iPhone com 5G",
    semi: [
      { gb: 64, cor: "Preto", bat: 84, p: 1899 },
      { gb: 128, cor: "Azul-escuro", bat: 88, p: 2199 },
    ],
  },
  {
    id: "13",
    slug: "iphone-13",
    nome: "iPhone 13",
    pro: false,
    tela: '6,1" Super Retina XDR',
    chip: "A15 Bionic",
    cam: "12 MP + ultra-angular 12 MP",
    arm: "128, 256 ou 512 GB",
    con: "Lightning",
    dest: "Modo Cinema na câmera",
    semi: [
      { gb: 128, cor: "Meia-noite", bat: 89, p: 2599 },
      { gb: 128, cor: "Estelar", bat: 86, p: 2499 },
      { gb: 256, cor: "Azul-escuro", bat: 91, p: 2899 },
    ],
  },
  {
    id: "14",
    slug: "iphone-14",
    nome: "iPhone 14",
    pro: false,
    tela: '6,1" Super Retina XDR',
    chip: "A15 Bionic",
    cam: "12 MP + ultra-angular 12 MP",
    arm: "128, 256 ou 512 GB",
    con: "Lightning",
    dest: "Detecção de Acidente",
    semi: [
      { gb: 128, cor: "Roxo", bat: 90, p: 2999 },
      { gb: 256, cor: "Meia-noite", bat: 87, p: 3299 },
    ],
  },
  {
    id: "12p",
    slug: "iphone-12-pro",
    nome: "iPhone 12 Pro",
    pro: true,
    tela: '6,1" Super Retina XDR',
    chip: "A14 Bionic",
    cam: "12 MP + ultra-angular 12 MP + tele 12 MP 2x",
    arm: "128, 256 ou 512 GB",
    con: "Lightning",
    dest: "Sensor LiDAR",
    semi: [{ gb: 128, cor: "Azul-pacífico", bat: 83, p: 2399 }],
  },
  {
    id: "12pm",
    slug: "iphone-12-pro-max",
    nome: "iPhone 12 Pro Max",
    pro: true,
    tela: '6,7" Super Retina XDR',
    chip: "A14 Bionic",
    cam: "12 MP + ultra-angular 12 MP + tele 12 MP 2,5x",
    arm: "128, 256 ou 512 GB",
    con: "Lightning",
    dest: "Estabilização por deslocamento do sensor",
    semi: [],
  },
  {
    id: "13p",
    slug: "iphone-13-pro",
    nome: "iPhone 13 Pro",
    pro: true,
    tela: '6,1" ProMotion até 120 Hz',
    chip: "A15 Bionic",
    cam: "12 MP + ultra-angular 12 MP + tele 12 MP 3x",
    arm: "128 GB a 1 TB",
    con: "Lightning",
    dest: "Tela de 120 Hz e modo Macro",
    semi: [
      { gb: 128, cor: "Azul-sierra", bat: 87, p: 3299 },
      { gb: 256, cor: "Grafite", bat: 85, p: 3599 },
    ],
  },
  {
    id: "13pm",
    slug: "iphone-13-pro-max",
    nome: "iPhone 13 Pro Max",
    pro: true,
    tela: '6,7" ProMotion até 120 Hz',
    chip: "A15 Bionic",
    cam: "12 MP + ultra-angular 12 MP + tele 12 MP 3x",
    arm: "128 GB a 1 TB",
    con: "Lightning",
    dest: "Bateria que dura o dia todo",
    semi: [{ gb: 256, cor: "Verde-alpino", bat: 88, p: 3999 }],
  },
  {
    id: "14p",
    slug: "iphone-14-pro",
    nome: "iPhone 14 Pro",
    pro: true,
    tela: '6,1" ProMotion, sempre ativa',
    chip: "A16 Bionic",
    cam: "48 MP + ultra-angular 12 MP + tele 12 MP 3x",
    arm: "128 GB a 1 TB",
    con: "Lightning",
    dest: "Primeiro com Dynamic Island",
    semi: [{ gb: 128, cor: "Roxo-profundo", bat: 89, p: 4199 }],
  },
  {
    id: "14pm",
    slug: "iphone-14-pro-max",
    nome: "iPhone 14 Pro Max",
    pro: true,
    tela: '6,7" ProMotion, sempre ativa',
    chip: "A16 Bionic",
    cam: "48 MP + ultra-angular 12 MP + tele 12 MP 3x",
    arm: "128 GB a 1 TB",
    con: "Lightning",
    dest: "Dynamic Island na tela grande",
    semi: [
      { gb: 256, cor: "Dourado", bat: 90, p: 4799 },
      { gb: 128, cor: "Preto-espacial", bat: 86, p: 4499 },
    ],
  },
  {
    id: "15pro",
    slug: "iphone-15-pro",
    nome: "iPhone 15 Pro",
    pro: true,
    tela: '6,1" ProMotion',
    chip: "A17 Pro",
    cam: "48 MP + ultra-angular 12 MP + tele 12 MP 3x",
    arm: "128 GB a 1 TB",
    con: "USB-C",
    dest: "Titânio e botão de Ação",
    semi: [
      { gb: 128, cor: "Titânio natural", bat: 92, p: 4699 },
      { gb: 256, cor: "Titânio azul", bat: 94, p: 5199 },
    ],
  },
  {
    id: "15pm",
    slug: "iphone-15-pro-max",
    nome: "iPhone 15 Pro Max",
    pro: true,
    tela: '6,7" ProMotion',
    chip: "A17 Pro",
    cam: "48 MP + ultra-angular 12 MP + tele 12 MP 5x",
    arm: "256 GB a 1 TB",
    con: "USB-C",
    dest: "Teleobjetiva de 5x",
    semi: [{ gb: 256, cor: "Titânio natural", bat: 93, p: 5799 }],
  },
  {
    id: "16p",
    slug: "iphone-16-pro",
    nome: "iPhone 16 Pro",
    pro: true,
    tela: '6,3" ProMotion',
    chip: "A18 Pro",
    cam: "48 MP + ultra-angular 48 MP + tele 12 MP 5x",
    arm: "128 GB a 1 TB",
    con: "USB-C",
    dest: "Botão Controle da Câmera",
    semi: [{ gb: 256, cor: "Titânio deserto", bat: 97, p: 6499 }],
  },
  {
    id: "16pm",
    slug: "iphone-16-pro-max",
    nome: "iPhone 16 Pro Max",
    pro: true,
    tela: '6,9" ProMotion',
    chip: "A18 Pro",
    cam: "48 MP + ultra-angular 48 MP + tele 12 MP 5x",
    arm: "256 GB a 1 TB",
    con: "USB-C",
    dest: "A maior tela até então, 6,9\"",
    semi: [],
  },
];

export const aparelhoPorId = (id: string): Aparelho | undefined =>
  aparelhos.find((a) => a.id === id);

export const aparelhoPorSlug = (slug: string): Aparelho | undefined =>
  aparelhos.find((a) => a.slug === slug);

/** Menor preço entre novos e seminovos do modelo (Infinity se não há nenhum). */
export const menorPreco = (a: Aparelho): number =>
  Math.min(
    Infinity,
    ...[...(a.novo?.gb ?? []).map((g) => g[1]), ...(a.semi ?? []).map((u) => u.p)].filter(Boolean),
  );
