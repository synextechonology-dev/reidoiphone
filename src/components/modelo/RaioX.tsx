"use client";

// Raio-X: pontos brancos de 7 px sobre a foto de costas (câmera, chip, bateria, conector),
// cada um com uma etiqueta. As posições (%) são da prévia; reposicionar quando entrar a foto real.
import { useEffect, useRef, useState } from "react";
import type { Aparelho } from "@/content/aparelhos";
import s from "./RaioX.module.css";

export default function RaioX({ modelo, bat }: { modelo: Aparelho; bat?: number }) {
  const [aberto, setAberto] = useState<number | null>(null);
  const raiz = useRef<HTMLSpanElement>(null);

  // Toque fora fecha a etiqueta aberta
  useEffect(() => {
    function fora(e: PointerEvent) {
      if (!raiz.current?.contains(e.target as Node)) setAberto(null);
    }
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
  }, []);

  const pontos = [
    { x: modelo.pro ? 24 : 22, y: modelo.pro ? 13 : 12, t: "Câmera", v: modelo.cam },
    { x: 58, y: 38, t: "Chip", v: modelo.chip },
    {
      x: 46,
      y: 64,
      t: "Bateria",
      v: bat ? `Saúde ${bat}%, carrega com MagSafe` : "Nova, 100%. Carrega com MagSafe",
    },
    { x: 50, y: 97, t: "Conector", v: modelo.con },
  ];

  return (
    <span className={s.rx} ref={raiz}>
      {pontos.map((p, i) => (
        <span
          key={p.t}
          className={`${s.hs} ${p.x > 50 ? s.esq : s.dir} ${aberto === i ? s.on : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, ["--d" as string]: `${i * 120}ms` }}
        >
          <button
            type="button"
            className={s.dot}
            aria-expanded={aberto === i}
            aria-label={`${p.t}: ${p.v}`}
            onClick={() => setAberto(aberto === i ? null : i)}
          >
            <i />
          </button>
          <span className={s.tip} role="tooltip">
            <b>{p.t}</b>
            <span className="mono">{p.v}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
