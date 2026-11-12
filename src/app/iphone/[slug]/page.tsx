import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aparelhoPorSlug, aparelhos, temPagina } from "@/content/aparelhos";
import { JsonLd, dadosProduct } from "@/lib/jsonld";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Rodape from "@/components/Rodape";
import PaginaModelo from "@/components/modelo/PaginaModelo";

type Props = { params: Promise<{ slug: string }> };

// Uma página estática por modelo à venda (o iPhone 18, ainda "Em breve", não tem página).
export function generateStaticParams() {
  return aparelhos.filter(temPagina).map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const modelo = aparelhoPorSlug(slug);
  if (!modelo) return {};
  // "seminovo e novo" quando o modelo tem os dois; só a condição que existe nos demais
  const cond =
    modelo.novo?.gb.length && modelo.semi?.length ? "seminovo e novo" : modelo.novo?.gb.length ? "novo" : "seminovo";
  const title = `${modelo.nome} ${cond} em Santa Cruz do Rio Pardo | ${site.nome}`;
  const description = `${modelo.nome} ${cond} em Santa Cruz do Rio Pardo (SP). ${modelo.dest}. Tela ${modelo.tela}, chip ${modelo.chip}. Bateria informada e atendimento pelo WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: `/iphone/${modelo.slug}` },
    openGraph: { type: "website", locale: "pt_BR", siteName: site.nome, title, description, url: `/iphone/${modelo.slug}` },
  };
}

export default async function PaginaDoModelo({ params }: Props) {
  const { slug } = await params;
  const modelo = aparelhoPorSlug(slug);
  if (!modelo || !temPagina(modelo)) notFound();

  return (
    <>
      <JsonLd dados={dadosProduct(modelo)} />
      <Header />
      <main id="inicio">
        <PaginaModelo slug={slug} />
      </main>
      <Rodape />
    </>
  );
}
