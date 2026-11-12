import Image from "next/image";
import Link from "next/link";
import { linkWhatsApp } from "@/lib/whatsapp";
import { pendente, site } from "@/content/site";
import s from "./Rodape.module.css";

export default function Rodape() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.cols}>
          <div className={s.fb}>
            <Image className={s.logoD} src="/marca/simbolo-dourado-fundo-escuro.png" alt="Rei do iPhone" width={80} height={120} />
            <Image className={s.logoL} src="/marca/simbolo-dourado-fundo-claro.png" alt="Rei do iPhone" width={80} height={120} />
          </div>
          <div>
            <h3>Navegue</h3>
            <ul>
              <li><a href="#vitrine">Vitrine</a></li>
              <li><a href="#qual">Qual é o seu</a></li>
              <li><a href="#comparar">Comparar</a></li>
              <li><a href="#duvidas">Dúvidas</a></li>
            </ul>
          </div>
          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <a href={linkWhatsApp(site.mensagemPadrao)} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#onde">Endereço e horário</a>
              </li>
              <li>
                {pendente.instagram ? (
                  <a href="#onde">
                    Instagram <span className="tbc" style={{ marginLeft: 6 }}>@ a confirmar</span>
                  </a>
                ) : (
                  <a href={`https://instagram.com/${site.instagram.replace("@", "")}`} target="_blank" rel="noopener">
                    Instagram
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={s.legal}>
          <p>
            © 2026 Rei do iPhone. CNPJ <span className="tbc">{site.cnpj}</span>.{" "}
            <Link href="/privacidade">Política de privacidade</Link> e <Link href="/cookies">cookies</Link>.
          </p>
          <p>
            iPhone é marca registrada da Apple Inc. O Rei do iPhone é uma loja independente, sem vínculo com a
            Apple.
          </p>
        </div>
      </div>
    </footer>
  );
}
