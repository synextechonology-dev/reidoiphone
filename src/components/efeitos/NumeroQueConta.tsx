"use client";

// Números que contam: os números de um texto contam de 0 até o valor (1,1 s) quando a área
// aparece na tela, uma vez. Não se aplica a nomes de chip (A16, A20 Pro): use texto simples.
// Com prefers-reduced-motion os números ficam parados.
import { useEffect, useRef } from "react";

/** Envolve cada número do texto (123 ou 6,1) num <span> que sabe contar. */
export function NumeroQueConta({ texto }: { texto: string }) {
  const partes = texto.split(/(\d+(?:,\d+)?)/g);
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="cnt-n" data-to={p} style={{ fontVariantNumeric: "tabular-nums" }}>
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

function contar(raiz: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  raiz.querySelectorAll<HTMLElement>(".cnt-n").forEach((el) => {
    const alvo = el.dataset.to ?? "";
    const casas = (alvo.split(",")[1] ?? "").length;
    const fim = parseFloat(alvo.replace(",", "."));
    if (!(fim >= 2)) return; // números pequenos (1, 1,5) não contam
    const t0 = performance.now();
    const dur = 1100;
    const passo = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = (fim * e).toFixed(casas).replace(".", ",");
      if (k < 1) requestAnimationFrame(passo);
      else el.textContent = alvo;
    };
    el.textContent = (0).toFixed(casas).replace(".", ",");
    requestAnimationFrame(passo);
  });
}

/**
 * Dispara a contagem quando a área aparece (uma vez por `chave`). Se `chave` mudar depois
 * (por exemplo, o usuário troca o modelo no comparador), conta de novo na hora.
 */
export function ContarAoAparecer({
  chave,
  children,
}: {
  chave: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visto.current) {
      contar(el);
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (itens) => {
        if (itens.some((i) => i.isIntersecting)) {
          visto.current = true;
          io.disconnect();
          contar(el);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [chave]);

  return <div ref={ref}>{children}</div>;
}
