"use client";

import { aparelhoPorId } from "@/content/aparelhos";
import { linhas } from "@/content/linhas";
import s from "./NavSeminovos.module.css";

export const qtd = (id: string): number => aparelhoPorId(id)?.semi?.length ?? 0;
const curto = (id: string): string => aparelhoPorId(id)!.nome.replace("iPhone ", "");

export default function NavSeminovos({
  linha,
  modelo,
  aoEscolherLinha,
  aoEscolherModelo,
}: {
  linha: string;
  modelo: string;
  aoEscolherLinha: (l: string) => void;
  aoEscolherModelo: (id: string) => void;
}) {
  const ids = linhas.find((l) => l.linha === linha)!.modelos;
  return (
    <div className={s.nav}>
      <div className={s.row} role="group" aria-label="Linha do iPhone">
        {linhas.map(({ linha: l, modelos }) => (
          <button
            key={l}
            type="button"
            className={`${s.chip} ${l === linha ? s.on : ""}`}
            aria-pressed={l === linha}
            onClick={() => aoEscolherLinha(l)}
          >
            iPhone {l}
            <small>{modelos.reduce((t, i) => t + qtd(i), 0)}</small>
          </button>
        ))}
      </div>
      <div className={`${s.row} ${s.sub}`} role="group" aria-label={`Modelos do iPhone ${linha}`}>
        {ids.map((i) => (
          <button
            key={i}
            type="button"
            className={`${s.mod} ${i === modelo ? s.on : ""}`}
            aria-pressed={i === modelo}
            onClick={() => aoEscolherModelo(i)}
          >
            {curto(i)}
            <small>{qtd(i) ? `${qtd(i)} ${qtd(i) > 1 ? "aparelhos" : "aparelho"}` : "sem estoque"}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
