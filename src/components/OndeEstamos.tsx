import { linkWhatsApp } from "@/lib/whatsapp";
import { pendente, site } from "@/content/site";
import { IconWhatsApp } from "./Icones";
import s from "./OndeEstamos.module.css";

export default function OndeEstamos() {
  const { endereco } = site;
  return (
    <section className="sec" id="onde" aria-labelledby="h-onde">
      <div className="wrap">
        <div className="head">
          <h2 className="h2" id="h-onde">
            Venha ver de perto
          </h2>
        </div>
        <div className={s.where}>
          <div className={s.place}>
            <dl>
              <div>
                <dt>Endereço</dt>
                <dd>
                  {endereco.rua}
                  <br />
                  {endereco.cidade}, {endereco.uf}
                </dd>
              </div>
              <div>
                <dt>Horário</dt>
                <dd>
                  {/* PENDENTE: horário a confirmar com o Felipe */}
                  {site.horario.map((linha, i) => (
                    <span key={linha}>
                      {i > 0 && <br />}
                      <span className="tbc">{linha}</span>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd className="mono">
                  <span className={pendente.whatsapp ? "tbc" : undefined}>{site.whatsappExibido}</span>
                </dd>
              </div>
            </dl>
            <div className={s.b2}>
              <a
                className="btn btn-gold btn-sm"
                href={linkWhatsApp(site.mensagemPadrao)}
                target="_blank"
                rel="noopener"
              >
                <IconWhatsApp />
                Falar no WhatsApp
              </a>
              <a className="btn btn-line btn-sm" href={site.google.perfil} target="_blank" rel="noopener">
                Como chegar
              </a>
            </div>
          </div>
          <div className={s.map} role="img" aria-label="Espaço do mapa da loja">
            Mapa da loja (link do Google Maps)
          </div>
        </div>
      </div>
    </section>
  );
}
