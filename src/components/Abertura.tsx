"use client";

// Abertura: o logo aparece e a cortina preta sobe com uma linha dourada (2,5 s).
// Uma vez por sessão (sessionStorage), só começa com a página visível, clique ou tecla pula.
// O script do layout marca <html data-abertura> antes da pintura para a cortina já cobrir a página.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./Abertura.module.css";

type Fase = "espera" | "toca" | "pula" | "fim";

export default function Abertura() {
  const [fase, setFase] = useState<Fase>("espera");
  const pularRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!document.documentElement.dataset.abertura) {
      setFase("fim");
      return;
    }

    let t: number | undefined;
    let removido = false;

    function encerrar() {
      if (removido) return;
      removido = true;
      delete document.documentElement.dataset.abertura;
      setFase("fim");
    }

    function comecar() {
      try {
        sessionStorage.setItem("rei-abertura", "1");
      } catch {
        /* sem sessionStorage: toca a cada carregamento */
      }
      setFase("toca");
      t = window.setTimeout(encerrar, 2600);
    }

    function pular() {
      setFase((f) => (f === "toca" ? "pula" : f));
      window.clearTimeout(t);
      t = window.setTimeout(encerrar, 600);
    }

    function quandoVisivel() {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(() => requestAnimationFrame(comecar));
      } else {
        const v = () => {
          if (document.visibilityState === "visible") {
            document.removeEventListener("visibilitychange", v);
            comecar();
          }
        };
        document.addEventListener("visibilitychange", v);
      }
    }

    pularRef.current = pular;
    window.addEventListener("keydown", pular);
    quandoVisivel();
    return () => {
      window.removeEventListener("keydown", pular);
      window.clearTimeout(t);
    };
  }, []);

  if (fase === "fim") return null;

  return (
    <div
      className={`${s.intro} ${fase !== "espera" ? s.play : ""} ${fase === "pula" ? s.skip : ""}`}
      aria-hidden="true"
      onClick={() => pularRef.current()}
    >
      <div className={s.door}>
        <div className={s.doorIn}>
          <span className={s.logo}>
            <Image className={s.sym} src="/marca/simbolo-dourado-fundo-escuro.png" alt="" width={80} height={120} priority />
            <Image className={s.wm} src="/marca/escrita-branca.png" alt="" width={361} height={60} priority />
            <i className={s.line} />
          </span>
        </div>
      </div>
    </div>
  );
}
