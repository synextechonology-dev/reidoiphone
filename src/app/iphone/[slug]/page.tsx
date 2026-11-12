import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aparelhoPorSlug, aparelhos, temPagina } from "@/content/aparelhos";
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
  return {
    title: `${modelo.nome} seminovo e novo em Santa Cruz do Rio Pardo | Rei do iPhone`,
  };
}

export default async function PaginaDoModelo({ params }: Props) {
  const { slug } = await params;
  const modelo = aparelhoPorSlug(slug);
  if (!modelo || !temPagina(modelo)) notFound();

  return (
    <>
      <Header />
      <main id="inicio">
        <PaginaModelo slug={slug} />
      </main>
      <Rodape />
    </>
  );
}
