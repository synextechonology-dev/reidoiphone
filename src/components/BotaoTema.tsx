"use client";

import { useEffect, useState } from "react";
import { IconLua, IconSol } from "./Icones";
import s from "./Header.module.css";

type Tema = "escuro" | "claro";

export default function BotaoTema() {
  const [tema, setTema] = useState<Tema>("escuro");

  // O script do layout já aplicou o tema salvo; aqui só sincronizamos o rótulo.
  useEffect(() => {
    setTema(document.documentElement.dataset.tema === "claro" ? "claro" : "escuro");
  }, []);

  function alternar() {
    const novo: Tema = tema === "claro" ? "escuro" : "claro";
    document.documentElement.dataset.tema = novo;
    setTema(novo);
    try {
      localStorage.setItem("rei-tema", novo);
    } catch {
      /* navegação privada ou site data bloqueado: o tema vale só nesta visita */
    }
  }

  return (
    <button
      className="icon-btn"
      id="tema"
      type="button"
      aria-label={tema === "claro" ? "Mudar para tema escuro" : "Mudar para tema claro"}
      onClick={alternar}
    >
      <IconLua className={s.icLua} />
      <IconSol className={s.icSol} />
    </button>
  );
}
