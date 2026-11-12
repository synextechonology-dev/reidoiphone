"use client";

// Fundo do hero: gradiente em movimento por baixo, foto por cima (zoom de entrada de 1,6 s) e a foto
// se desloca de leve acompanhando o cursor. O deslocamento só existe com mouse e sem
// prefers-reduced-motion. Copiado da prévia (.hero-bg).
import { useEffect, useRef } from "react";
import Image from "next/image";
import s from "./Hero.module.css";

export default function HeroFundo() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const hero = el?.closest("section");
    if (!el || !hero) return;
    if (!matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)").matches) return;

    function mover(e: PointerEvent) {
      const r = hero!.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el!.style.setProperty("--px", `${(-x * 18).toFixed(1)}px`);
      el!.style.setProperty("--py", `${(-y * 12).toFixed(1)}px`);
    }
    function soltar() {
      el!.style.setProperty("--px", "0px");
      el!.style.setProperty("--py", "0px");
    }

    hero.addEventListener("pointermove", mover);
    hero.addEventListener("pointerleave", soltar);
    return () => {
      hero.removeEventListener("pointermove", mover);
      hero.removeEventListener("pointerleave", soltar);
    };
  }, []);

  return (
    <div className={s.bg} aria-hidden="true">
      <div className={s.frame} ref={frame}>
        <Image src="/fotos/hero-principal.webp" alt="" fill priority sizes="100vw" />
      </div>
    </div>
  );
}
