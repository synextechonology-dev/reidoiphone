import Link from "next/link";
import { CORES, type Aparelho as Modelo, type Unidade } from "@/content/aparelhos";
import { brl, gbl } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/whatsapp";
import Aparelho from "./Aparelho";
import Palco from "./Palco";
import c from "./Cards.module.css";

/** Um card por aparelho seminovo (unidade a unidade). */
export function CardSeminovo({ modelo, unidade, indice }: { modelo: Modelo; unidade: Unidade; indice: number }) {
  const u = unidade;
  const msg = `Olá! Quero o ${modelo.nome} seminovo, ${gbl(u.gb)}, cor ${u.cor}, bateria ${u.bat}%, de ${brl(u.p)}. Ainda está disponível?`;
  return (
    <article className={c.pc} aria-labelledby={`tu-${modelo.id}-${indice}`}>
      <Palco>
        <Aparelho modelo={modelo} cor={u.cor} className={c.aparelho} />
      </Palco>
      <div className={c.head}>
        <h3 id={`tu-${modelo.id}-${indice}`}>{modelo.nome}</h3>
      </div>
      <p className={c.dest}>
        <span
          className={c.dot}
          style={{ ["--c" as string]: CORES[u.cor], display: "inline-block", verticalAlign: -1, marginRight: 6 }}
          aria-hidden="true"
        />
        {gbl(u.gb)}, {u.cor}
      </p>
      <div style={{ paddingInline: 4 }}>
        <span className={`${c.bat} ${u.bat >= 85 ? c.ok : c.mid}`}>
          <span className={c.bar} style={{ width: 96 }} aria-hidden="true">
            <i style={{ width: `${u.bat}%` }} />
          </span>
          Bateria {u.bat}%
        </span>
      </div>
      <div className={c.buy}>
        <div className={c.price}>
          <b>{brl(u.p)}</b>
          <small>no Pix, ou em até 12x</small>
        </div>
        <div className={c.acts}>
          <a
            className="btn btn-gold"
            href={linkWhatsApp(msg)}
            target="_blank"
            rel="noopener"
            aria-label={`Quero este: ${modelo.nome}, ${gbl(u.gb)}, ${u.cor}, bateria ${u.bat}%, ${brl(u.p)}`}
          >
            Quero este
          </a>
          <Link className="btn btn-line" href={`/iphone/${modelo.slug}?u=${indice}`}>
            Ver modelo
          </Link>
        </div>
        <span className={c.ex}>VALOR DE EXEMPLO</span>
      </div>
    </article>
  );
}

/** Modelo sem nenhum seminovo no estoque. */
export function CardSemEstoque({ modelo }: { modelo: Modelo }) {
  return (
    <article className={c.pc} aria-labelledby={`tv-${modelo.id}`}>
      <Palco>
        <Aparelho modelo={modelo} cor="Prata-claro" className={c.aparelho} style={{ opacity: 0.3 }} />
      </Palco>
      <div className={c.head}>
        <h3 id={`tv-${modelo.id}`}>{modelo.nome}</h3>
      </div>
      <p className={c.dest}>{modelo.dest}</p>
      <div className={c.soonBox}>
        <p>Nenhum {modelo.nome} seminovo na loja agora. Avisamos quando chegar.</p>
        <a
          className="btn btn-line"
          href={linkWhatsApp(`Olá! Quero ser avisado quando chegar um ${modelo.nome} seminovo.`)}
          target="_blank"
          rel="noopener"
        >
          Avise quando chegar
        </a>
      </div>
    </article>
  );
}
