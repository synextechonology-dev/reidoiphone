"use client";

// Deslizar da lateral: o bloco entra pela esquerda ou direita, uma vez, quando aparece na tela.
// Sem JS, sem IntersectionObserver ou com prefers-reduced-motion, fica parado no lugar.
import { useEffect, useRef, useState } from "react";
import s from "./DeslizarLateral.module.css";

type Fase = "parado" | "oculto" | "entra";

export default function DeslizarLateral({
  lado,
  ordem = 0,
  className = "",
  children,
}: {
  lado: "esquerda" | "direita";
  /** atraso escalonado: ordem × 120 ms */
  ordem?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState<Fase>("parado");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    setFase("oculto");
    const io = new IntersectionObserver(
      (itens) => {
        if (itens.some((i) => i.isIntersecting)) {
          setFase("entra");
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const esq = lado === "esquerda";
  return (
    <div
      ref={ref}
      className={`${className} ${fase === "oculto" ? `${s.oculto} ${esq ? s.esq : s.dir}` : ""} ${fase === "entra" ? (esq ? s.entraEsq : s.entraDir) : ""}`}
      style={{ ["--i" as string]: ordem }}
    >
      {children}
    </div>
  );
}
