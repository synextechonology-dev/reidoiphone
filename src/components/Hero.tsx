import { linkWhatsApp } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { IconSeta } from "./Icones";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${s.hero} band-dark`} aria-labelledby="h-hero">
      {/* Fundo: gradiente em movimento (9 s). A foto de fundo real entra por cima quando o Felipe mandar. */}
      <div className={s.bg} aria-hidden="true" />
      <div className="wrap">
        <div className={s.copy}>
          <a className={s.pill} href="#vitrine">
            iPhone 18 Pro Max <b>na vitrine</b>
            <span className={s.go}>
              <IconSeta />
            </span>
          </a>
          <h1 id="h-hero" className={s.h1}>
            Quem entende de iPhone <span>é o Rei</span>
          </h1>
          <div className={s.ctas}>
            <a className="btn btn-gold" href="#vitrine">
              Ver a vitrine
            </a>
            <a className="lnk" href={linkWhatsApp(site.mensagemPadrao)} target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
          </div>
        </div>
        <span className={`${s.note} tbc`}>foto de fundo do hero entra aqui (3 aparelhos de costas, 4K)</span>
      </div>
    </section>
  );
}
