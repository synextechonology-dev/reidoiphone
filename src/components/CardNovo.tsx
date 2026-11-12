"use client";

import { useState } from "react";
import Link from "next/link";
import { CORES, fotos, type Aparelho as Modelo } from "@/content/aparelhos";
import { brl, gbl } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/whatsapp";
import { IconCamera, IconChip, IconConector, IconTela } from "./Icones";
import Aparelho from "./Aparelho";
import Palco from "./Palco";
import c from "./Cards.module.css";
import s from "./CardNovo.module.css";

const specs = [
  { k: "tela", rotulo: "Tela", Icone: IconTela },
  { k: "chip", rotulo: "Chip", Icone: IconChip },
  { k: "cam", rotulo: "Câmera", Icone: IconCamera },
  { k: "con", rotulo: "Conector", Icone: IconConector },
] as const;

export default function CardNovo({ modelo }: { modelo: Modelo }) {
  const novo = modelo.novo!;
  const [cor, setCor] = useState(novo.cores[0]);
  const [gb, setGb] = useState(novo.gb[0]?.[0] ?? 0);

  if (modelo.soon) {
    return (
      <article className={c.pc} data-inclinar="7" id={`card-${modelo.id}`} aria-labelledby={`t-${modelo.id}`}>
        <Palco tag={{ texto: "Em breve", tipo: "soon" }}>
          <Aparelho modelo={modelo} cor="Preto" className={c.aparelho} style={{ opacity: 0.35, ["--c" as string]: "#3a3a3d" }} />
        </Palco>
        <div className={c.head}>
          <h3 id={`t-${modelo.id}`}>{modelo.nome}</h3>
        </div>
        <div className={c.soonBox}>
          <p>{modelo.dest}. A ficha técnica entra aqui quando a Apple anunciar.</p>
          <a
            className="btn btn-line"
            href={linkWhatsApp("Olá! Quero ser avisado quando o iPhone 18 chegar na loja.")}
            target="_blank"
            rel="noopener"
          >
            Avise quando chegar
          </a>
        </div>
      </article>
    );
  }

  const preco = novo.gb.find((g) => g[0] === gb)![1];
  const msg = `Olá! Quero o ${modelo.nome} novo, ${gbl(gb)}, cor ${cor}, de ${brl(preco)}. Tem disponível?`;

  return (
    <article className={c.pc} data-inclinar="7" id={`card-${modelo.id}`} aria-labelledby={`t-${modelo.id}`}>
      <Palco tag={modelo.lanc ? { texto: "Lançamento", tipo: "new" } : undefined}>
        {fotos[`${modelo.id}|${cor}`] && <span className={`${c.refTag} tbc`}>foto de referência</span>}
        <Aparelho modelo={modelo} cor={cor} className={c.aparelho} />
      </Palco>
      <div className={c.head}>
        <h3 id={`t-${modelo.id}`}>{modelo.nome}</h3>
      </div>
      <p className={c.dest}>{modelo.dest}</p>

      <fieldset className={s.opt}>
        <legend>
          Cor: <b>{cor}</b>
        </legend>
        <div className={s.sw}>
          {novo.cores.map((nome) => (
            <label key={nome} title={nome}>
              <input
                type="radio"
                name={`cor-${modelo.id}`}
                value={nome}
                checked={nome === cor}
                aria-label={nome}
                onChange={() => setCor(nome)}
              />
              <span style={{ ["--c" as string]: CORES[nome] }} />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={s.opt}>
        <legend>Armazenamento</legend>
        <div className={s.gb}>
          {novo.gb.map(([g]) => (
            <label key={g}>
              <input
                type="radio"
                name={`gb-${modelo.id}`}
                value={g}
                checked={g === gb}
                onChange={() => setGb(g)}
              />
              <span>{gbl(g)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <dl className={s.specs}>
        {specs.map(({ k, rotulo, Icone }) => (
          <div key={k}>
            <Icone />
            <dt>{rotulo}</dt>
            <dd>{modelo[k]}</dd>
          </div>
        ))}
      </dl>

      <div className={c.buy}>
        <div className={c.price} data-inclinar="14" data-inclinar-z="12">
          <b>{brl(preco)}</b>
          <small>no Pix, ou em até 12x</small>
        </div>
        <div className={c.acts}>
          <a className="btn btn-gold" href={linkWhatsApp(msg)} target="_blank" rel="noopener">
            Quero este
          </a>
          <Link className="btn btn-line" href={`/iphone/${modelo.slug}`} aria-label={`Ver o ${modelo.nome}`}>
            Ver modelo
          </Link>
        </div>
        <span className={c.ex}>VALOR DE EXEMPLO</span>
      </div>
    </article>
  );
}
