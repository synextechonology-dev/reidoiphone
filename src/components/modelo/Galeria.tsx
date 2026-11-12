"use client";

// Galeria: uma foto por vez. A próxima expande e a atual encolhe (flex-grow .7 s). Setas e contador.
import { useState } from "react";
import { CORES, comIlha, fotos, type Aparelho as Modelo } from "@/content/aparelhos";
import { IconDireita, IconEsquerda } from "../Icones";
import Aparelho from "../Aparelho";
import RaioX from "./RaioX";
import s from "./Galeria.module.css";

const nomes = ["Costas", "Frente", "Lateral", "Câmera"];

export default function Galeria({ modelo, cor, bat }: { modelo: Modelo; cor: string; bat?: number }) {
  const [vista, setVista] = useState(0);
  const temFoto = !!fotos[`${modelo.id}|${cor}`];
  const vars = { ["--c" as string]: CORES[cor] } as React.CSSProperties;

  const vistas = [
    <>
      <Aparelho modelo={modelo} cor={cor} className={s.devView} />
      {vista === 0 && <RaioX modelo={modelo} bat={bat} />}
    </>,
    <span className={s.front} style={vars}>
      <i className={comIlha.includes(modelo.id) ? s.isl : s.notch} />
      <span className={s.time}>9:41</span>
    </span>,
    <span className={s.side} style={vars}>
      <i />
      <i />
      <i />
    </span>,
    <span className={s.cam}>
      <Aparelho modelo={modelo} cor={cor} className={s.camDev} />
    </span>,
  ];

  const ir = (i: number) => setVista((i + nomes.length) % nomes.length);

  return (
    <>
      <div className={s.pans} role="group" aria-label={`Fotos do ${modelo.nome}`}>
        {vistas.map((conteudo, i) => (
          <div key={nomes[i]} className={`${s.pan} ${i === vista ? s.aberto : ""}`} aria-hidden={i !== vista}>
            <span className={`${s.refTag} tbc`}>{i === 0 && temFoto ? "foto de referência" : "foto real entra aqui"}</span>
            <span className={s.view}>{conteudo}</span>
            <span className={s.rot}>{nomes[i]}</span>
          </div>
        ))}
      </div>
      <div className={s.nav}>
        <button type="button" aria-label="Foto anterior" onClick={() => ir(vista - 1)}>
          <IconEsquerda />
        </button>
        <span className={s.cnt} aria-live="polite">
          <b>{nomes[vista]}</b>, {vista + 1} de {nomes.length}
        </span>
        <button type="button" aria-label="Próxima foto" onClick={() => ir(vista + 1)}>
          <IconDireita />
        </button>
      </div>
      <p className={s.hint}>
        <i aria-hidden="true" />
        Raio-X: toque nos pontos para ver cada parte por dentro
      </p>
    </>
  );
}
