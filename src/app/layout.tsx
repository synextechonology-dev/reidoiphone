import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono, Inter, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "Rei do iPhone | iPhones novos e seminovos em Santa Cruz do Rio Pardo",
  description:
    "Loja de iPhones novos e seminovos em Santa Cruz do Rio Pardo (SP), com bateria informada e atendimento pelo WhatsApp.",
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
              "try{if(localStorage.getItem('rei-tema')==='claro')document.documentElement.dataset.tema='claro'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
