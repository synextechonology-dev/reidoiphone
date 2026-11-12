"use client";

// Inclinar 3D (só com mouse): elementos com data-inclinar="<graus>" seguem o cursor.
// data-inclinar-z="<px>" afasta o elemento do fundo. Cards de modelo: 7°; preços: 14° e 12 px.
// Não faz nada em tela de toque nem com prefers-reduced-motion. A foto da página do modelo
// tem a própria versão, que também responde ao dedo (modelo/Galeria.tsx).
import { useEffect } from "react";

const SELETOR = "[data-inclinar]";

export default function Inclinar3D() {
  useEffect(() => {
    if (!matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)").matches) return;

    let atuais = new Set<HTMLElement>();

    function inclinar(el: HTMLElement, ev: PointerEvent) {
      const forca = Number(el.dataset.inclinar) || 0;
      const z = Number(el.dataset.inclinarZ) || 0;
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * forca}deg) rotateX(${-y * forca}deg) translateZ(${z}px)`;
    }

    function soltar(el: HTMLElement) {
      el.style.transform = "";
    }

    function mover(ev: PointerEvent) {
      if (ev.pointerType !== "mouse") return;
      // todos os ancestrais inclináveis (um preço dentro de um card, por exemplo)
      const novos = new Set<HTMLElement>();
      let el = (ev.target as Element | null)?.closest<HTMLElement>(SELETOR) ?? null;
      while (el) {
        novos.add(el);
        el = el.parentElement?.closest<HTMLElement>(SELETOR) ?? null;
      }
      atuais.forEach((a) => {
        if (!novos.has(a)) soltar(a);
      });
      novos.forEach((n) => inclinar(n, ev));
      atuais = novos;
    }

    function sair(ev: PointerEvent) {
      if (ev.relatedTarget) return;
      atuais.forEach(soltar);
      atuais = new Set();
    }

    document.addEventListener("pointermove", mover);
    document.addEventListener("pointerout", sair);
    return () => {
      document.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerout", sair);
      atuais.forEach(soltar);
    };
  }, []);

  return null;
}
