import { CORES, type Aparelho } from "@/content/aparelhos";
import { brl, gbl } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/whatsapp";
import s from "./SeminovosDoModelo.module.css";

/** Lista dos seminovos do modelo (só para modelos que também têm versão nova). */
export default function SeminovosDoModelo({ modelo, extraTexto }: { modelo: Aparelho; extraTexto: string }) {
  return (
    <div className="mp-sec">
      <h2 className="mp-h">Seminovos deste modelo</h2>
      <p className={s.sub}>Cada aparelho com a saúde da bateria e o preço.</p>
      <ul className={s.units}>
        {(modelo.semi ?? []).map((u, i) => (
          <li className={s.unit} key={i}>
            <div className={s.l}>
              <div className={s.r1}>
                <span className={s.dot} style={{ ["--c" as string]: CORES[u.cor] }} aria-hidden="true" />
                {gbl(u.gb)}, {u.cor}
              </div>
              <span className={`${s.bat} ${u.bat >= 85 ? s.ok : s.mid}`}>
                <span className={s.bar}>
                  <i style={{ width: `${u.bat}%` }} />
                </span>
                Bateria {u.bat}%
              </span>
            </div>
            <div className={s.pr}>
              <b>{brl(u.p)}</b>
              <small>no Pix</small>
            </div>
            <a
              className="btn btn-gold btn-sm"
              href={linkWhatsApp(
                `Olá! Quero o ${modelo.nome} seminovo, ${gbl(u.gb)}, cor ${u.cor}, bateria ${u.bat}%, de ${brl(u.p)}.${extraTexto} Ainda está disponível?`,
              )}
              target="_blank"
              rel="noopener"
            >
              Quero este
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
