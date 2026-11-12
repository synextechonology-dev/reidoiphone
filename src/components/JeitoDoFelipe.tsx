import { IconBateria, IconDoc, IconEscudo, IconSacola } from "./Icones";
import s from "./JeitoDoFelipe.module.css";

export default function JeitoDoFelipe() {
  return (
    <section className={`${s.felipe} sec`} aria-labelledby="h-fel">
      <div className={`wrap ${s.grid}`}>
        <div className={s.portrait} role="img" aria-label="Espaço para a foto do Felipe na loja">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="tbc">foto do Felipe na loja</span>
        </div>
        <div className={s.copy}>
          <h2 className="h2" id="h-fel">
            Do jeito do Felipe
          </h2>
          <p className={s.big}>
            Novos e seminovos com procedência, bateria informada e preço na vitrine. Escolha o seu, chame no
            WhatsApp e retire na loja ou receba em casa.
          </p>
          <ul className={s.pillars}>
            <li>
              <IconDoc />
              <h3>Procedência</h3>
              <p>
                Cada aparelho tem origem conferida e <span className="tbc">nota fiscal</span>.
              </p>
            </li>
            <li>
              <IconBateria />
              <h3>Bateria informada</h3>
              <p>A saúde da bateria aparece na vitrine, antes de você chamar.</p>
            </li>
            <li>
              <IconEscudo />
              <h3>Garantia</h3>
              <p>
                Novos e seminovos saem da loja com garantia de <span className="tbc">X meses</span>.
              </p>
            </li>
            <li>
              <IconSacola />
              <h3>Retire ou receba</h3>
              <p>Na loja ou em casa, em Santa Cruz do Rio Pardo.</p>
            </li>
          </ul>
          <p className={s.sign}>
            <b>Felipe</b>, dono do Rei do iPhone
          </p>
        </div>
      </div>
    </section>
  );
}
