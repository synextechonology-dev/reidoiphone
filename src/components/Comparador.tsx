"use client";

import { useEffect, useRef, useState } from "react";
import { aparelhoPorId, aparelhos, menorPreco, type Aparelho as Modelo } from "@/content/aparelhos";
import { brl } from "@/lib/formatar";
import { IconCamera, IconChip, IconConector, IconDisco, IconEstrela, IconTela } from "./Icones";
import Aparelho from "./Aparelho";
import DeslizarLateral from "./efeitos/DeslizarLateral";
import { ContarAoAparecer, NumeroQueConta } from "./efeitos/NumeroQueConta";
import s from "./Comparador.module.css";

type Lado = "a" | "b";

// Só modelos à venda (novo ou com seminovo em estoque)
const opcoes = aparelhos.filter((m) => !m.soon && (m.novo || m.semi?.length));

const linhas = [
  { k: "tela", rotulo: "Tela", Icone: IconTela },
  { k: "chip", rotulo: "Chip", Icone: IconChip },
  { k: "cam", rotulo: "Câmera", Icone: IconCamera },
  { k: "arm", rotulo: "Armazenamento", Icone: IconDisco },
  { k: "con", rotulo: "Conector", Icone: IconConector },
  { k: "dest", rotulo: "Destaque", Icone: IconEstrela },
] as const;

const corDe = (m: Modelo) => (m.novo ? m.novo.cores[0] : m.semi![0].cor);

// Linhas em que os números contam (não os nomes de chip)
const contam = ["tela", "cam", "arm"];

function Coluna({ lado, id, aoMudar }: { lado: Lado; id: string; aoMudar: (id: string) => void }) {
  const m = aparelhoPorId(id)!;
  return (
    <DeslizarLateral lado={lado === "a" ? "esquerda" : "direita"} ordem={lado === "a" ? 0 : 1} className={s.col}>
      <Aparelho modelo={m} cor={corDe(m)} className={s.aparelho} />
      <label htmlFor={`sel-${lado}`}>{lado === "a" ? "Primeiro" : "Segundo"} modelo</label>
      <select className={s.sel} id={`sel-${lado}`} value={id} onChange={(e) => aoMudar(e.target.value)}>
        {opcoes.map((x) => (
          <option key={x.id} value={x.id}>
            {x.nome}
          </option>
        ))}
      </select>
      <span className={s.from}>
        a partir de<b>{brl(menorPreco(m))}</b>
      </span>
    </DeslizarLateral>
  );
}

export default function Comparador() {
  const [sel, setSel] = useState<Record<Lado, string>>({ a: "17", b: "18pm" });
  const ultimo = useRef<Lado>("a");

  // O botão "Comparar" do quiz manda o modelo sugerido para um dos lados.
  useEffect(() => {
    function receber(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      setSel((atual) => {
        if (atual.a === id || atual.b === id) return atual;
        ultimo.current = ultimo.current === "a" ? "b" : "a";
        return { ...atual, [ultimo.current]: id };
      });
    }
    window.addEventListener("rei-comparar", receber);
    // Vindo da página de um modelo ("Comparar com outro"): o id fica em sessionStorage.
    try {
      const id = sessionStorage.getItem("rei-comparar");
      if (id) {
        sessionStorage.removeItem("rei-comparar");
        if (aparelhoPorId(id)) receber(new CustomEvent("rei-comparar", { detail: id }));
      }
    } catch {
      /* sem sessionStorage: segue com os modelos padrão */
    }
    return () => window.removeEventListener("rei-comparar", receber);
  }, []);

  const A = aparelhoPorId(sel.a)!;
  const B = aparelhoPorId(sel.b)!;

  return (
    <section
      className="sec band-dark"
      id="comparar"
      aria-labelledby="h-cmp"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-cmp">
            Na dúvida entre dois?
          </h2>
          <p className="sub">Coloque lado a lado e veja o que muda.</p>
        </div>
        <div className={s.cmp}>
          <div className={s.top}>
            <Coluna lado="a" id={sel.a} aoMudar={(id) => setSel((x) => ({ ...x, a: id }))} />
            <Coluna lado="b" id={sel.b} aoMudar={(id) => setSel((x) => ({ ...x, b: id }))} />
          </div>
          <ContarAoAparecer chave={sel.a + sel.b}>
          <div className={s.rows}>
            {linhas.map(({ k, rotulo, Icone }) => {
              const diff = A[k] !== B[k];
              return (
                <div className={`${s.row} ${diff ? s.diff : ""}`} key={k}>
                  <h3>
                    <Icone />
                    {rotulo}
                    {diff && <span className="sr"> (diferente)</span>}
                  </h3>
                  <div className={s.vals}>
                    <span>{contam.includes(k) ? <NumeroQueConta texto={A[k] ?? ""} /> : A[k]}</span>
                    <span>{contam.includes(k) ? <NumeroQueConta texto={B[k] ?? ""} /> : B[k]}</span>
                  </div>
                </div>
              );
            })}
          </div>
          </ContarAoAparecer>
          <p className={s.legend}>
            <span className={s.df} aria-hidden="true" />
            Em dourado, o que é diferente entre os dois
          </p>
        </div>
      </div>
    </section>
  );
}
