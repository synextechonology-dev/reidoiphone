import Image from "next/image";
import { linkWhatsApp } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { IconWhatsApp } from "./Icones";
import BotaoTema from "./BotaoTema";
import { MenuBotao, MenuGaveta, MenuProvider } from "./MenuMobile";
import s from "./Header.module.css";

export const menu = [
  { href: "#vitrine", rotulo: "Vitrine" },
  { href: "#qual", rotulo: "Qual é o seu" },
  { href: "#comparar", rotulo: "Comparar" },
  { href: "#duvidas", rotulo: "Dúvidas" },
  { href: "#onde", rotulo: "Onde estamos" },
];

export default function Header() {
  return (
    <header className={s.top}>
      <MenuProvider>
        <div className={`wrap ${s.barra}`}>
          <a className={s.brand} href="#inicio" aria-label="Rei do iPhone, voltar ao início">
            <Image className={s.logoD} src="/marca/simbolo-dourado-fundo-escuro.png" alt="" width={80} height={120} priority />
            <Image className={s.logoL} src="/marca/simbolo-dourado-fundo-claro.png" alt="" width={80} height={120} priority />
            <Image className={`${s.wm} ${s.logoD}`} src="/marca/escrita-branca.png" alt="" width={361} height={60} priority />
            <Image className={`${s.wm} ${s.logoL}`} src="/marca/escrita-escura.png" alt="" width={361} height={60} priority />
          </a>
          <nav className={s.nav} aria-label="Principal">
            {menu.map((m) => (
              <a key={m.href} href={m.href}>
                {m.rotulo}
              </a>
            ))}
          </nav>
          <BotaoTema />
          <a
            className={`btn btn-gold btn-sm ${s.cta}`}
            href={linkWhatsApp(site.mensagemPadrao)}
            target="_blank"
            rel="noopener"
          >
            <IconWhatsApp />
            Falar no WhatsApp
          </a>
          <MenuBotao />
        </div>
        <MenuGaveta>
          <ul>
            {menu.map((m) => (
              <li key={m.href}>
                <a href={m.href}>{m.rotulo}</a>
              </li>
            ))}
          </ul>
        </MenuGaveta>
      </MenuProvider>
    </header>
  );
}
