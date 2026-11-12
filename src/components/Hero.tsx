import { linkWhatsApp } from "@/lib/whatsapp";
import { site } from "@/content/site";
import PilulaHero from "./PilulaHero";
import HeroFundo from "./HeroFundo";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${s.hero} band-dark`} aria-labelledby="h-hero">
      <HeroFundo />
      <div className="wrap">
        <div className={s.copy}>
          <PilulaHero />
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
        <span className={`${s.note} tbc`}>imagem de fundo de referência, trocar antes de publicar</span>
      </div>
    </section>
  );
}
