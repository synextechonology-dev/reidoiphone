import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import AvisoCookies from "@/components/AvisoCookies";
import Abertura from "@/components/Abertura";
import Inclinar3D from "@/components/efeitos/Inclinar3D";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Geist: só no H1 do hero
const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rei do iPhone | iPhones novos e seminovos em Santa Cruz do Rio Pardo",
  description: site.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Rei do iPhone | iPhones novos e seminovos em Santa Cruz do Rio Pardo",
    description: site.descricao,
    url: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} ${plexMono.variable} ${geist.variable}`}
    >
      <head>
        {/* Aplica o tema salvo antes da pintura (evita piscar). Padrão: escuro. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('rei-tema')==='claro')document.documentElement.dataset.tema='claro'}catch(e){}" +
              "try{if(!sessionStorage.getItem('rei-abertura'))document.documentElement.dataset.abertura='1'}catch(e){document.documentElement.dataset.abertura='1'}",
          }}
        />
      </head>
      <body>
        <Abertura />
        <Inclinar3D />
        {children}
        <AvisoCookies />
      </body>
    </html>
  );
}
