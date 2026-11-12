"use client";

// Barra fixa de WhatsApp, só no celular. Some quando o rodapé aparece.
// (Na Etapa 6 ela também some enquanto o aviso de cookies estiver aberto.)
import { useEffect, useState } from "react";
import { linkWhatsApp } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { IconWhatsApp } from "./Icones";
import s from "./BarraWhatsApp.module.css";

export default function BarraWhatsApp() {
  const [escondida, setEscondida] = useState(false);

  useEffect(() => {
    const rodape = document.querySelector("footer");
    if (!rodape) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setEscondida(e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(rodape);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${s.barra} ${escondida ? s.hide : ""}`} id="wa-fix">
      <a className="btn btn-gold" href={linkWhatsApp(site.mensagemPadrao)} target="_blank" rel="noopener">
        <IconWhatsApp />
        Falar no WhatsApp
      </a>
    </div>
  );
}
