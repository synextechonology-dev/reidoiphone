import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Rodape from "@/components/Rodape";
import ReverCookies from "@/components/ReverCookies";
import s from "@/components/Legal.module.css";

export const metadata: Metadata = {
  title: "Política de cookies | Rei do iPhone",
  description: "O que o site do Rei do iPhone guarda no seu navegador e como mudar sua escolha.",
  alternates: { canonical: "/cookies" },
};

// RASCUNHO: descreve o que o site guarda hoje. Revisar junto com /privacidade (docs/pendencias.md).
export default function Cookies() {
  return (
    <>
      <Header />
      <main id="inicio">
        <div className={`wrap ${s.pagina}`}>
          <h1>Política de cookies</h1>
          <p className={s.data}>Atualizada em 11/11/2026</p>

          <p>
            Cookies e itens parecidos (como o armazenamento local do navegador) são pequenos registros guardados no seu
            aparelho. Este site usa só o necessário para funcionar e lembrar suas preferências.
          </p>

          <h2>O que guardamos</h2>
          <div className={s.rolagem}>
            <table className={s.tabela}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Para que serve</th>
                  <th>Quanto tempo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>rei-tema</code>
                  </td>
                  <td>Lembra se você prefere o tema claro ou o escuro.</td>
                  <td>Até você limpar os dados do site</td>
                </tr>
                <tr>
                  <td>
                    <code>rei-abertura</code>
                  </td>
                  <td>Marca que a animação de abertura já passou, para não repetir na mesma visita.</td>
                  <td>Até fechar a aba ou o navegador</td>
                </tr>
                <tr>
                  <td>
                    <code>rei-cookies</code>
                  </td>
                  <td>Guarda a sua resposta ao aviso de cookies.</td>
                  <td>Até você limpar os dados do site</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>O que não usamos</h2>
          <p>
            Não usamos cookies de publicidade, de rastreamento entre sites nem de análise de visitas. Se isso mudar,
            essas ferramentas só serão ativadas se você escolher &ldquo;Aceitar&rdquo; no aviso, e esta página será
            atualizada antes.
          </p>

          <h2>Como mudar sua escolha</h2>
          <p>
            Use o botão abaixo para ver o aviso de novo, ou limpe os dados do site nas configurações do navegador. Mais
            sobre o tratamento de dados na <Link href="/privacidade">política de privacidade</Link>.
          </p>
          <div className={s.acao}>
            <ReverCookies />
          </div>
        </div>
      </main>
      <Rodape />
    </>
  );
}
