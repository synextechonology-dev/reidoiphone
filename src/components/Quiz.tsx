"use client";

import { useState } from "react";
import { aparelhos, type Aparelho as Modelo } from "@/content/aparelhos";
import { brl, gbl } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/whatsapp";
import Aparelho from "./Aparelho";
import s from "./Quiz.module.css";

type Opcao = { m: Modelo; cond: "novo" | "semi"; p: number; gb: number; cor: string; bat?: number };

// Todas as opções da vitrine: o menor GB de cada novo e cada seminovo em estoque.
function opcoes(): Opcao[] {
  const out: Opcao[] = [];
  aparelhos.forEach((m) => {
    if (m.novo && !m.soon) out.push({ m, cond: "novo", p: m.novo.gb[0][1], gb: m.novo.gb[0][0], cor: m.novo.cores[0] });
    (m.semi ?? []).forEach((u) => out.push({ m, cond: "semi", p: u.p, gb: u.gb, cor: u.cor, bat: u.bat }));
  });
  return out;
}

const PESO = {
  camera: (o: Opcao) =>
    (o.m.pro ? 3 : 0) + (/48 MP/.test(o.m.cam ?? "") ? 1 : 0) + (/abertura/.test(o.m.cam ?? "") ? 2 : 0),
  tela: (o: Opcao) =>
    (/6,9/.test(o.m.tela ?? "") ? 4 : 0) + (/6,3/.test(o.m.tela ?? "") ? 2 : 0) + (/120|ProMotion/.test(o.m.tela ?? "") ? 1 : 0),
  preco: (o: Opcao) => -o.p / 1000,
};

type Foco = keyof typeof PESO;
type Resp = { foco?: Foco; cond?: "novo" | "semi" | "tanto"; faixa?: string };

function sugerir({ foco, cond, faixa }: Required<Resp>) {
  const todas = opcoes().filter((o) => cond === "tanto" || o.cond === cond);
  let dentro = todas.filter((o) => o.p <= +faixa);
  let aviso = "";
  if (!dentro.length) {
    dentro = [...todas].sort((a, b) => a.p - b.p).slice(0, 1);
    aviso = " Nenhum aparelho cabe nessa faixa agora; este é o mais próximo.";
  }
  const best = [...dentro].sort((a, b) => PESO[foco](b) - PESO[foco](a) || (foco === "preco" ? 0 : b.p - a.p))[0];
  const por = {
    camera: `Tem a melhor câmera entre as opções até ${faixa === "99999" ? "o topo da vitrine" : brl(+faixa)}: ${best.m.cam}.`,
    tela: `Tem a maior tela entre as opções da sua faixa: ${best.m.tela}.`,
    preco: `É a opção com o menor preço${cond === "tanto" ? "" : " na condição escolhida"}.`,
  }[foco];
  return { best, why: por + aviso };
}

const perguntas = [
  {
    nome: "foco",
    legenda: "O que mais pesa pra você?",
    opcoes: [
      ["camera", "Câmera"],
      ["tela", "Tela grande"],
      ["preco", "Preço"],
    ],
  },
  {
    nome: "cond",
    legenda: "Novo ou seminovo?",
    opcoes: [
      ["novo", "Novo"],
      ["semi", "Seminovo"],
      ["tanto", "Tanto faz"],
    ],
  },
  {
    nome: "faixa",
    legenda: "Até quanto quer investir?",
    opcoes: [
      ["3000", "Até R$ 3 mil"],
      ["6000", "Até R$ 6 mil"],
      ["99999", "Acima de R$ 6 mil"],
    ],
  },
] as const;

export default function Quiz() {
  const [r, setR] = useState<Resp>({});
  const completo = r.foco && r.cond && r.faixa;
  const res = completo ? sugerir(r as Required<Resp>) : null;

  function comparar(id: string) {
    window.dispatchEvent(new CustomEvent("rei-comparar", { detail: id }));
    document.getElementById("comparar")?.scrollIntoView();
  }

  return (
    <section className="sec" id="qual" aria-labelledby="h-qual" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-qual">
            Qual iPhone combina com você?
          </h2>
          <p className="sub">Responda três perguntas e o Rei sugere um aparelho da vitrine.</p>
        </div>
        <form className={s.quiz} onSubmit={(e) => e.preventDefault()}>
          <div className={s.qs}>
            {perguntas.map((p) => (
              <fieldset className={s.q} key={p.nome}>
                <legend>{p.legenda}</legend>
                <div className={s.ch}>
                  {p.opcoes.map(([valor, rotulo]) => (
                    <label key={valor}>
                      <input
                        type="radio"
                        name={p.nome}
                        value={valor}
                        checked={r[p.nome] === valor}
                        onChange={() => setR((a) => ({ ...a, [p.nome]: valor }))}
                      />
                      <span>{rotulo}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <div className={`${s.res} ${res ? s.on : ""}`} aria-live="polite">
            {res ? (
              <>
                <div className={s.resTop}>
                  <Aparelho modelo={res.best.m} cor={res.best.cor} className={s.aparelho} />
                  <div>
                    <p className={s.kick}>Sugestão do Rei</p>
                    <h3>{res.best.m.nome}</h3>
                    <p className="mono" style={{ fontSize: 13.5 }}>
                      {res.best.cond === "novo" ? "Novo" : "Seminovo"}, {gbl(res.best.gb)}, {res.best.cor}
                      {res.best.bat ? `, bateria ${res.best.bat}%` : ""}
                    </p>
                  </div>
                </div>
                <p className={s.why}>{res.why}</p>
                <div className={s.price}>
                  <b>{brl(res.best.p)}</b>
                  <small>no Pix</small>
                </div>
                <div className={s.acts}>
                  <a
                    className="btn btn-gold btn-sm"
                    href={linkWhatsApp(
                      `Olá! O site me sugeriu o ${res.best.m.nome} ${res.best.cond === "novo" ? "novo" : "seminovo"}, ${gbl(res.best.gb)}, cor ${res.best.cor}${res.best.bat ? `, bateria ${res.best.bat}%` : ""}, de ${brl(res.best.p)}. Pode me falar mais?`,
                    )}
                    target="_blank"
                    rel="noopener"
                  >
                    Quero este
                  </a>
                  <button className="btn btn-line btn-sm" type="button" onClick={() => comparar(res.best.m.id)}>
                    Comparar
                  </button>
                </div>
              </>
            ) : (
              <p className={s.empty}>Responda as três perguntas para ver a sugestão.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
