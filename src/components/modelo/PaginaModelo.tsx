"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { aparelhoPorSlug, CORES } from "@/content/aparelhos";
import { acessorios } from "@/content/acessorios";
import { brl, gbl } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/whatsapp";
import { IconEsquerda, IconWhatsApp } from "../Icones";
import Aparelho from "../Aparelho";
import Galeria from "./Galeria";
import LeveJunto from "./LeveJunto";
import FichaTecnica from "./FichaTecnica";
import NaCaixa from "./NaCaixa";
import SeminovosDoModelo from "./SeminovosDoModelo";
import o from "../CardNovo.module.css";
import s from "./PaginaModelo.module.css";

export default function PaginaModelo({ slug }: { slug: string }) {
  const modelo = aparelhoPorSlug(slug)!;
  const router = useRouter();
  const novo = modelo.novo && modelo.novo.gb.length ? modelo.novo : undefined;
  const semi = modelo.semi ?? [];

  const [cor, setCor] = useState(novo?.cores[0] ?? "");
  const [gb, setGb] = useState(novo?.gb[0][0] ?? 0);
  const [unidade, setUnidade] = useState(0);
  const [marcados, setMarcados] = useState<Set<string>>(new Set());

  // "Ver modelo" nos seminovos manda ?u=índice para abrir já no aparelho escolhido.
  useEffect(() => {
    const u = Number(new URLSearchParams(window.location.search).get("u"));
    if (!novo && Number.isInteger(u) && u >= 0 && u < semi.length) setUnidade(u);
  }, [novo, semi.length]);

  const un = semi[unidade];
  const cfg = novo
    ? { cor, gb, p: novo.gb.find((g) => g[0] === gb)![1], bat: undefined as number | undefined }
    : { cor: un.cor, gb: un.gb, p: un.p, bat: un.bat as number | undefined };

  const itens = acessorios(modelo);
  const escolhidos = itens.filter((a) => marcados.has(a.id));
  const extra = escolhidos.reduce((t, a) => t + a.v, 0);
  const extraTexto = escolhidos.length
    ? ` Quero levar junto: ${escolhidos.map((a) => a.nome.toLowerCase()).join(", ")}.`
    : "";
  const cond = novo ? "novo" : "seminovo";
  const msg = `Olá! Vi no site o ${modelo.nome} ${cond}, ${gbl(cfg.gb)}, cor ${cfg.cor}${cfg.bat ? `, bateria ${cfg.bat}%` : ""}, de ${brl(cfg.p)}.${extraTexto} Tem disponível?`;

  const cores = novo ? novo.cores : [...new Set(semi.map((u) => u.cor))];

  function escolherCor(c: string) {
    if (novo) setCor(c);
    else setUnidade(Math.max(0, semi.findIndex((u) => u.cor === c)));
  }

  function alternar(id: string) {
    setMarcados((a) => {
      const n = new Set(a);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function comparar() {
    try {
      sessionStorage.setItem("rei-comparar", modelo.id);
    } catch {
      /* sem sessionStorage o comparador abre com os modelos padrão */
    }
    router.push("/#comparar");
  }

  return (
    <div className={`wrap ${s.mp}`}>
      <Link className={s.back} href="/#vitrine">
        <IconEsquerda width={18} height={18} />
        Voltar para a vitrine
      </Link>

      <div className={s.top}>
        <div className={s.gal}>
          <Galeria modelo={modelo} cor={cfg.cor} bat={cfg.bat} />
          <div className={s.thumbs} role="group" aria-label="Cores">
            {cores.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === cfg.cor}
                aria-label={`Ver na cor ${c}`}
                onClick={() => escolherCor(c)}
              >
                <Aparelho modelo={modelo} cor={c} className={s.thumbDev} />
              </button>
            ))}
          </div>
        </div>

        <div className={s.info}>
          <div className={s.badges}>
            {modelo.lanc && <span className={s.g}>Lançamento</span>}
            {novo && <span>Novo, lacrado</span>}
            {semi.length > 0 && <span>Seminovo disponível</span>}
          </div>
          <h1>{modelo.nome}</h1>
          <p className="sub" style={{ marginTop: -8 }}>
            {modelo.dest}.
          </p>

          {novo ? (
            <>
              <fieldset className={o.opt} style={{ padding: 0 }}>
                <legend>
                  Cor: <b>{cfg.cor}</b>
                </legend>
                <div className={o.sw}>
                  {novo.cores.map((c) => (
                    <label key={c} title={c}>
                      <input type="radio" name="mp-cor" value={c} checked={c === cor} aria-label={c} onChange={() => setCor(c)} />
                      <span style={{ ["--c" as string]: CORES[c] }} />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={o.opt} style={{ padding: 0 }}>
                <legend>Armazenamento</legend>
                <div className={o.gb}>
                  {novo.gb.map(([g]) => (
                    <label key={g}>
                      <input type="radio" name="mp-gb" value={g} checked={g === gb} onChange={() => setGb(g)} />
                      <span>{gbl(g)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          ) : (
            <fieldset className={o.opt} style={{ padding: 0 }}>
              <legend>Escolha o aparelho</legend>
              <div className={o.gb}>
                {semi.map((u, i) => (
                  <label key={i}>
                    <input type="radio" name="mp-semi" value={i} checked={i === unidade} onChange={() => setUnidade(i)} />
                    <span>
                      {gbl(u.gb)}, {u.cor}, {u.bat}%
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className={s.price}>
            <span className={s.big}>{brl(cfg.p)}</span>
            <span className={s.small}>
              no Pix, ou em até 12x de {brl(Math.ceil(cfg.p / 12))} no cartão <span className="tbc">juros a confirmar</span>
            </span>
            {cfg.bat ? (
              <span className={`${s.bat} ${cfg.bat >= 85 ? s.ok : s.mid}`}>
                <span className={s.bar}>
                  <i style={{ width: `${cfg.bat}%` }} />
                </span>
                Bateria {cfg.bat}%
              </span>
            ) : null}
            {extra > 0 && (
              <span className={s.tot}>
                Com os acessórios: <b>{brl(cfg.p + extra)}</b>
              </span>
            )}
            <span className={s.ex}>VALORES DE EXEMPLO</span>
          </div>

          <LeveJunto itens={itens} marcados={marcados} aoAlternar={alternar} />

          <div className={s.acts}>
            <a className="btn btn-gold" href={linkWhatsApp(msg)} target="_blank" rel="noopener">
              <IconWhatsApp />
              Quero este
            </a>
            <button className="btn btn-line" type="button" onClick={comparar}>
              Comparar com outro
            </button>
          </div>
        </div>
      </div>

      <div className={`mp-sec ${s.secGrid}`}>
        <FichaTecnica modelo={modelo} />
        <NaCaixa modelo={modelo} />
      </div>

      {novo && semi.length > 0 && <SeminovosDoModelo modelo={modelo} extraTexto={extraTexto} />}
    </div>
  );
}
