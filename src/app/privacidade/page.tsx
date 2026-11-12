import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Rodape from "@/components/Rodape";
import s from "@/components/Legal.module.css";

export const metadata: Metadata = {
  title: "Política de privacidade | Rei do iPhone",
  description: "Como o Rei do iPhone trata os dados de quem visita o site e chama no WhatsApp (LGPD).",
  alternates: { canonical: "/privacidade" },
};

// RASCUNHO baseado no que o site faz hoje (sem banco, sem servidor próprio, sem análise).
// PENDENTE: CNPJ, canal de contato do titular e revisão final do texto (docs/pendencias.md).
export default function Privacidade() {
  return (
    <>
      <Header />
      <main id="inicio">
        <div className={`wrap ${s.pagina}`}>
          <h1>Política de privacidade</h1>
          <p className={s.data}>Atualizada em 11/11/2026</p>

          <p>
            Esta política explica como o {site.nome} trata os dados pessoais de quem visita este site, em linha com a
            Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).
          </p>

          <h2>1. Quem é o controlador</h2>
          <p>
            {site.nome}, CNPJ <span className="tbc">{site.cnpj}</span>, {site.endereco.rua}, {site.endereco.cidade},{" "}
            {site.endereco.uf}. Contato para assuntos de privacidade: pelo WhatsApp da loja{" "}
            <span className="tbc">{site.whatsappExibido}</span>.
          </p>

          <h2>2. Quais dados tratamos</h2>
          <ul>
            <li>
              <b>O que você escreve no WhatsApp.</b> Os botões do site abrem uma conversa com a mensagem pronta (modelo,
              armazenamento, cor, preço e acessórios). O formulário &ldquo;Não achou o seu modelo?&rdquo; apenas monta a
              mensagem. Nada é enviado a um servidor nosso: o conteúdo só chega à loja quando você envia a mensagem no
              WhatsApp. Aí a loja passa a ter seu nome e número de telefone.
            </li>
            <li>
              <b>Dados técnicos de acesso.</b> A hospedagem do site pode registrar endereço IP, tipo de aparelho e
              navegador, páginas acessadas e data e hora, por segurança e funcionamento.
            </li>
            <li>
              <b>Preferências no seu aparelho.</b> O tema claro ou escuro, se a abertura do site já foi vista e a sua
              escolha de cookies ficam guardados no seu navegador. Veja a <Link href="/cookies">política de cookies</Link>.
            </li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Este site não tem cadastro, login nem pagamento, e não usa cookies de publicidade nem de análise.
          </p>

          <h2>3. Para que usamos e em que base legal</h2>
          <ul>
            <li>Responder seu contato e atender seu pedido de compra (procedimentos preliminares a contrato, art. 7º, V).</li>
            <li>Manter o site seguro e funcionando (legítimo interesse, art. 7º, IX).</li>
            <li>Cumprir obrigações legais, como emissão de nota fiscal e garantia (art. 7º, II).</li>
          </ul>

          <h2>4. Com quem compartilhamos</h2>
          <ul>
            <li>
              <b>WhatsApp (Meta):</b> quando você escolhe conversar com a loja, a conversa passa pelo WhatsApp, que tem
              a própria política de privacidade.
            </li>
            <li>
              <b>Hospedagem do site:</b> a empresa que hospeda o site processa os dados técnicos de acesso.
            </li>
            <li>
              <b>Google:</b> ao tocar em &ldquo;Como chegar&rdquo; ou &ldquo;Ver todas no Google&rdquo; você sai do site e
              passa a seguir as regras do Google.
            </li>
          </ul>
          <p style={{ marginTop: 12 }}>Não vendemos seus dados.</p>

          <h2>5. Por quanto tempo guardamos</h2>
          <p>
            As conversas ficam pelo tempo necessário para atender você e para cumprir obrigações de nota fiscal e
            garantia. Os dados técnicos de acesso seguem o prazo do provedor de hospedagem. Preferências do navegador
            ficam até você limpar os dados do site.
          </p>

          <h2>6. Seus direitos</h2>
          <p>
            Você pode pedir a confirmação de que tratamos seus dados, acesso, correção, anonimização, portabilidade,
            eliminação, informação sobre compartilhamento e a revogação de consentimento (art. 18 da LGPD). Para isso,
            fale com a loja pelo WhatsApp. Se achar que seus direitos não foram respeitados, você também pode procurar
            a Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <h2>7. Segurança</h2>
          <p>
            O site é servido por conexão segura (HTTPS) e não guarda dados em banco próprio. Mesmo assim, nenhum sistema
            é totalmente livre de riscos, e por isso coletamos o mínimo possível.
          </p>

          <h2>8. Mudanças nesta política</h2>
          <p>
            Se o site mudar (por exemplo, com cadastro ou ferramentas de análise), esta política será atualizada antes e
            a data no topo da página muda.
          </p>
        </div>
      </main>
      <Rodape />
    </>
  );
}
