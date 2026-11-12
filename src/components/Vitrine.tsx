"use client";

import { useEffect, useState } from "react";
import { aparelhoPorId, aparelhos } from "@/content/aparelhos";
import { linhas } from "@/content/linhas";
import CardNovo from "./CardNovo";
import { CardSeminovo, CardSemEstoque } from "./CardSeminovo";
import NavSeminovos, { qtd } from "./NavSeminovos";
import c from "./Cards.module.css";
import s from "./Vitrine.module.css";

type Modo = "novo" | "semi";

// Primeira linha e primeiro modelo que têm estoque (a prévia abre assim)
const linhaInicial = linhas.find((l) => l.modelos.some(qtd))!;
const modeloInicial = linhaInicial.modelos.find(qtd)!;

export default function Vitrine() {
  const [modo, setModo] = useState<Modo>("novo");
  const [linha, setLinha] = useState(linhaInicial.linha);
  const [modeloId, setModeloId] = useState(modeloInicial);

  // A pílula do hero ("iPhone 18 Pro Max na vitrine") pede para destacar um card.
  useEffect(() => {
    function destacar(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      setModo("novo");
      window.setTimeout(() => {
        const card = document.getElementById(`card-${id}`);
        if (!card) return;
        card.dataset.hot = "true";
        window.setTimeout(() => delete card.dataset.hot, 2200);
      }, 350);
    }
    window.addEventListener("rei-destacar", destacar);
    return () => window.removeEventListener("rei-destacar", destacar);
  }, []);

  function escolherLinha(l: string) {
    const ids = linhas.find((x) => x.linha === l)!.modelos;
    setLinha(l);
    setModeloId(ids.find(qtd) ?? ids[0]);
  }

  const modelo = aparelhoPorId(modeloId)!;
  const unidades = modelo.semi ?? [];

  return (
    <section className="sec" id="vitrine" aria-labelledby="h-vit">
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-vit">
            A vitrine do Rei
          </h2>
          <p className="sub">Escolha o modelo, a cor e o armazenamento. A mensagem para o WhatsApp sai pronta.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className={s.seg} data-v={modo} role="group" aria-label="Tipo de aparelho">
            <i aria-hidden="true" />
            <button type="button" aria-pressed={modo === "novo"} onClick={() => setModo("novo")}>
              Novos
            </button>
            <button type="button" aria-pressed={modo === "semi"} onClick={() => setModo("semi")}>
              Seminovos
            </button>
          </div>
        </div>
        <p className={s.hint}>
          {modo === "novo"
            ? "Lacrados, com a ficha técnica de cada modelo."
            : "Cada aparelho com a saúde da bateria e o preço."}
        </p>

        {modo === "semi" && (
          <NavSeminovos
            linha={linha}
            modelo={modeloId}
            aoEscolherLinha={escolherLinha}
            aoEscolherModelo={setModeloId}
          />
        )}

        {modo === "novo" ? (
          <div className={c.grid} aria-live="polite">
            {aparelhos
              .filter((a) => a.novo)
              .map((a) => (
                <CardNovo key={a.id} modelo={a} />
              ))}
          </div>
        ) : (
          <div className={`${c.grid} ${unidades.length > 1 ? "" : c.one}`} aria-live="polite">
            {unidades.length ? (
              unidades.map((u, i) => <CardSeminovo key={`${modelo.id}-${i}`} modelo={modelo} unidade={u} indice={i} />)
            ) : (
              <CardSemEstoque modelo={modelo} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
