import { duvidas } from "@/content/duvidas";
import s from "./Duvidas.module.css";

export default function Duvidas() {
  return (
    <section className={`${s.sec} sec`} id="duvidas" aria-labelledby="h-faq">
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-faq">
            Dúvidas
          </h2>
        </div>
        <div className={s.faq}>
          {duvidas.map((d) => (
            <details key={d.pergunta}>
              <summary>{d.pergunta}</summary>
              <p>
                {d.resposta.map((t, i) =>
                  typeof t === "string" ? (
                    <span key={i}>{t}</span>
                  ) : (
                    <span key={i} className="tbc">
                      {t.tbc}
                    </span>
                  ),
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
