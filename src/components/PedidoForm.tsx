"use client";

import { useState } from "react";
import { aparelhos } from "@/content/aparelhos";
import { linkWhatsApp } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icones";
import s from "./PedidoForm.module.css";

const modelos = ["Qualquer modelo", ...aparelhos.map((a) => a.nome), "Outro"];
const armazenamentos = ["Tanto faz", "128 GB", "256 GB", "512 GB", "1 TB", "2 TB"];
const condicoes = ["Tanto faz", "Novo", "Seminovo"];

export default function PedidoForm() {
  const [modelo, setModelo] = useState(modelos[0]);
  const [gb, setGb] = useState(armazenamentos[0]);
  const [cond, setCond] = useState(condicoes[0]);
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [link, setLink] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const n = nome.trim();
    if (!n) {
      setErro("Escreva seu nome para a loja te chamar.");
      document.getElementById("q-nome")?.focus();
      return;
    }
    setLink(
      linkWhatsApp(
        `Olá! Sou ${n}. Procuro um ${modelo}, armazenamento: ${gb}, condição: ${cond}. Vocês conseguem pra mim?`,
      ),
    );
  }

  return (
    <section className="sec" aria-labelledby="h-ask" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head c">
          <h2 className="h2" id="h-ask">
            Não achou o seu modelo?
          </h2>
          <p className="sub">Diga qual iPhone você procura que o Rei busca pra você.</p>
        </div>
        <form className={s.ask} onSubmit={enviar} noValidate>
          <div className={s.fg}>
            <div className={s.f}>
              <label htmlFor="q-mod">Modelo</label>
              <select id="q-mod" value={modelo} onChange={(e) => setModelo(e.target.value)}>
                {modelos.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className={s.f}>
              <label htmlFor="q-gb">Armazenamento</label>
              <select id="q-gb" value={gb} onChange={(e) => setGb(e.target.value)}>
                {armazenamentos.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className={s.f}>
              <label htmlFor="q-cond">Condição</label>
              <select id="q-cond" value={cond} onChange={(e) => setCond(e.target.value)}>
                {condicoes.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className={`${s.f} ${erro ? s.bad : ""}`}>
              <label htmlFor="q-nome">Seu nome</label>
              <input
                id="q-nome"
                autoComplete="given-name"
                placeholder="Ex.: Ana"
                value={nome}
                aria-invalid={!!erro}
                aria-describedby="e-nome"
                onChange={(e) => {
                  setNome(e.target.value);
                  setErro("");
                }}
              />
              <span className={s.err} id="e-nome" role="alert">
                {erro}
              </span>
            </div>
            <div className={`${s.f} ${s.fBtn}`}>
              <button className="btn btn-gold" type="submit">
                <IconWhatsApp />
                Pedir no WhatsApp
              </button>
            </div>
          </div>
          {link && (
            <p className={s.out}>
              Mensagem pronta.{" "}
              <a className="lnk" href={link} target="_blank" rel="noopener">
                Abrir no WhatsApp
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
