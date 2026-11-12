// Ícones SVG de traço, copiados de previa/index.html. Sem biblioteca de ícones.
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

const traco = { fill: "none", stroke: "currentColor" } as const;
const redondo = { strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IconWhatsApp = (p: Props) => (
  <Svg {...p}>
    <path {...traco} {...redondo} strokeWidth="2" d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
    <path {...traco} strokeLinecap="round" strokeWidth="1.8" d="M9 8.6c0 3.3 2.9 6.2 6.3 6.3l1-1.6-2-1-1 .9a5 5 0 0 1-2.6-2.6l.9-1-1-2z" />
  </Svg>
);

export const IconSeta = (p: Props) => (
  <Svg {...p}>
    <path {...traco} {...redondo} strokeWidth="2" d="M7 17L17 7M9 7h8v8" />
  </Svg>
);

export const IconDoc = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.6" d="M6 3h8l4 4v14H6z" />
    <path {...traco} strokeLinecap="round" strokeWidth="1.6" d="M14 3v4h4M9 12.5l2 2 4-4" />
  </Svg>
);

export const IconEscudo = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.6" d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
    <path {...traco} {...redondo} strokeWidth="1.6" d="M8.5 12l2.5 2.5 4.5-5" />
  </Svg>
);

export const IconBateria = (p: Props) => (
  <Svg {...p}>
    <rect x="3" y="7" width="16" height="10" rx="2.5" {...traco} strokeWidth="1.6" />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M21 10.5v3" />
    <rect x="5.5" y="9.5" width="9" height="5" rx="1" fill="currentColor" />
  </Svg>
);

export const IconSacola = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.6" d="M5 8h14l-1 12H6z" />
    <path {...traco} strokeLinecap="round" strokeWidth="1.6" d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Svg>
);

export const IconTela = (p: Props) => (
  <Svg {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" {...traco} strokeWidth="1.6" />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M10.5 5h3" />
  </Svg>
);

export const IconChip = (p: Props) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" {...traco} strokeWidth="1.6" />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
  </Svg>
);

export const IconCamera = (p: Props) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" {...traco} strokeWidth="1.6" />
    <circle cx="9" cy="9" r="2.5" {...traco} strokeWidth="1.6" />
    <circle cx="9" cy="15.5" r="2.5" {...traco} strokeWidth="1.6" />
    <circle cx="16" cy="12" r="2.5" {...traco} strokeWidth="1.6" />
  </Svg>
);

export const IconDisco = (p: Props) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6.5" rx="7" ry="3" {...traco} strokeWidth="1.6" />
    <path {...traco} strokeWidth="1.6" d="M5 6.5v11c0 1.7 3.1 3 7 3s7-1.3 7-3v-11M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </Svg>
);

export const IconConector = (p: Props) => (
  <Svg {...p}>
    <path {...traco} {...redondo} strokeWidth="1.6" d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" />
  </Svg>
);

export const IconEstrela = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.6" d="M12 3l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.1L6.6 19.2l1.3-6-4.5-4 6-.6z" />
  </Svg>
);

export const IconEtiqueta = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.6" d="M3 12V4h8l10 10-8 8z" />
    <circle cx="7.5" cy="8.5" r="1.4" fill="currentColor" />
  </Svg>
);

/* Tema e navegação (também da prévia) */
export const IconLua = (p: Props) => (
  <Svg {...p}>
    <path {...traco} strokeLinejoin="round" strokeWidth="1.7" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </Svg>
);

export const IconSol = (p: Props) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" {...traco} strokeWidth="1.7" />
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
  </Svg>
);

export const IconMenu = (p: Props) => (
  <Svg {...p}>
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="M4 8h16M4 16h16" />
  </Svg>
);

export const IconEsquerda = (p: Props) => (
  <Svg {...p}>
    <path {...traco} {...redondo} strokeWidth="2" d="M15 6l-6 6 6 6" />
  </Svg>
);

export const IconDireita = (p: Props) => (
  <Svg {...p}>
    <path {...traco} {...redondo} strokeWidth="2" d="M9 6l6 6-6 6" />
  </Svg>
);
