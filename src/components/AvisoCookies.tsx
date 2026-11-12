"use client";

// Aviso de cookies: "Aceitar" ou "Só os essenciais". A escolha fica em localStorage (rei-cookies).
// Enquanto o aviso está aberto, o <html> recebe data-cookies="aberto" e a barra de WhatsApp do
// celular fica escondida. O site de hoje não usa cookies de análise nem de publicidade; a
// escolha só passa a valer quando houver alguma ferramenta opcional.
import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./AvisoCookies.module.css";

const CHAVE = "rei-cookies";

export default function AvisoCookies() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    function abrir() {
      setAberto(true);
    }
    try {
      if (!localStorage.getItem(CHAVE)) setAberto(true);
    } catch {
      setAberto(true); // sem localStorage, pergunta de novo a cada visita
    }
    window.addEventListener("rei-cookies-abrir", abrir);
    return () => window.removeEventListener("rei-cookies-abrir", abrir);
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (aberto) raiz.dataset.cookies = "aberto";
    else delete raiz.dataset.cookies;
    return () => {
      delete raiz.dataset.cookies;
    };
  }, [aberto]);

  function escolher(valor: "todos" | "essenciais") {
    try {
      localStorage.setItem(CHAVE, valor);
    } catch {
      /* sem localStorage: a escolha vale só nesta visita */
    }
    setAberto(false);
  }

  if (!aberto) return null;

  return (
    <section className={s.aviso} role="dialog" aria-labelledby="cookies-t" aria-describedby="cookies-d">
      <h2 id="cookies-t">Cookies</h2>
      <p id="cookies-d">
        Usamos só o necessário para o site funcionar e lembrar seu tema. Saiba mais na{" "}
        <Link href="/cookies">política de cookies</Link> e na <Link href="/privacidade">política de privacidade</Link>.
      </p>
      <div className={s.acoes}>
        <button type="button" className="btn btn-gold btn-sm" onClick={() => escolher("todos")}>
          Aceitar
        </button>
        <button type="button" className="btn btn-line btn-sm" onClick={() => escolher("essenciais")}>
          Só os essenciais
        </button>
      </div>
    </section>
  );
}
