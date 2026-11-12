"use client";

// Estado do menu mobile compartilhado entre o botão (dentro da barra) e a gaveta (abaixo dela).
// O Header continua Server Component e passa seu conteúdo como children.
import { createContext, useContext, useState } from "react";
import { IconMenu } from "./Icones";
import s from "./Header.module.css";

const Ctx = createContext<{ aberto: boolean; alternar: () => void; fechar: () => void } | null>(null);

function useMenu() {
  const c = useContext(Ctx);
  if (!c) throw new Error("MenuMobile fora do MenuProvider");
  return c;
}

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  return (
    <Ctx.Provider value={{ aberto, alternar: () => setAberto((v) => !v), fechar: () => setAberto(false) }}>
      {children}
    </Ctx.Provider>
  );
}

export function MenuBotao() {
  const { aberto, alternar } = useMenu();
  return (
    <button
      id="menu-btn"
      className={`icon-btn ${s.menuBtn}`}
      type="button"
      aria-expanded={aberto}
      aria-controls="drawer"
      aria-label={aberto ? "Fechar menu" : "Abrir menu"}
      onClick={alternar}
    >
      <IconMenu />
    </button>
  );
}

export function MenuGaveta({ children }: { children: React.ReactNode }) {
  const { aberto, fechar } = useMenu();
  return (
    <nav className={s.drawer} id="drawer" aria-label="Menu" hidden={!aberto} onClick={(e) => {
      if ((e.target as HTMLElement).closest("a")) fechar();
    }}>
      {children}
    </nav>
  );
}
