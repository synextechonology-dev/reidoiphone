import { avaliacoes } from "@/content/avaliacoes";
import { site } from "@/content/site";
import s from "./Avaliacoes.module.css";

export default function Avaliacoes() {
  return (
    <section className="sec" aria-labelledby="h-rev">
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-rev">
            Quem comprou, recomenda
          </h2>
        </div>
        <div className={s.score}>
          <b>{site.google.nota}</b>
          <span className={s.stars} aria-hidden="true">
            ★★★★★
          </span>
          <span>no Google, {site.google.avaliacoes} avaliações</span>
        </div>
        <div className={s.reviews}>
          {avaliacoes.map((a) => (
            <article className={s.rv} key={a.autor}>
              <span className={s.st} role="img" aria-label="5 de 5 estrelas">
                ★★★★★
              </span>
              <p>{a.texto}</p>
              <footer>
                <b>{a.autor}</b>
                <span>{a.quando}</span>
              </footer>
            </article>
          ))}
        </div>
        <div className={s.more}>
          <a className="btn btn-line" href={site.google.perfil} target="_blank" rel="noopener">
            Ver todas no Google
          </a>
        </div>
      </div>
    </section>
  );
}
