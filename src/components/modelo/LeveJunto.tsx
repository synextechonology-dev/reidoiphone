"use client";

import type { Acessorio } from "@/content/acessorios";
import { brl } from "@/lib/formatar";
import s from "./LeveJunto.module.css";

export default function LeveJunto({
  itens,
  marcados,
  aoAlternar,
}: {
  itens: Acessorio[];
  marcados: Set<string>;
  aoAlternar: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mp-h">Leve junto</h2>
      <p className={s.sub}>
        Marque o que quiser. Os itens vão na mensagem do WhatsApp.{" "}
        <span className="tbc">itens e preços a confirmar</span>
      </p>
      <div className={s.acc}>
        {itens.map((a) => (
          <label key={a.id}>
            <input type="checkbox" name="mp-acc" value={a.id} checked={marcados.has(a.id)} onChange={() => aoAlternar(a.id)} />
            <span className={s.n}>
              {a.nome}
              <span className={s.d}>{a.desc}</span>
            </span>
            <span className={s.v}>+ {brl(a.v)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
