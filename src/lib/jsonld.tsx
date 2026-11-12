import { fotos, type Aparelho } from "@/content/aparelhos";
import { site } from "@/content/site";
import { gbl } from "@/lib/formatar";

/** Imprime dados estruturados (JSON-LD). O "<" é escapado para o JSON não fechar a tag. */
export function JsonLd({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}

const vendedor = { "@type": "Organization", name: site.nome, url: site.url };

/** LocalBusiness da home. Só entram dados confirmados (endereço e perfil do Google). */
export function dadosLocalBusiness() {
  const numero = site.whatsapp.replace(/\D/g, "");
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MobilePhoneStore"],
    "@id": `${site.url}/#loja`,
    name: site.nome,
    description: site.descricao,
    url: site.url,
    logo: `${site.url}/marca/simbolo-dourado-fundo-escuro.png`,
    image: `${site.url}/marca/logo-original-fundo-preto.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.endereco.rua,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      addressCountry: "BR",
    },
    sameAs: [site.google.perfil],
    // PENDENTE: telefone, horário e CNPJ entram aqui quando o Felipe confirmar
    ...(numero ? { telephone: `+${numero}` } : {}),
  };
}

/** Product + Offer de um modelo. ATENÇÃO: os preços ainda são EXEMPLO (docs/pendencias.md). */
export function dadosProduct(a: Aparelho) {
  const url = `${site.url}/iphone/${a.slug}`;
  const novas = (a.novo?.gb ?? []).map(([gb, p]) => ({
    "@type": "Offer",
    name: `${a.nome} novo, ${gbl(gb)}`,
    price: p,
    priceCurrency: "BRL",
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    url,
    seller: vendedor,
  }));
  const usadas = (a.semi ?? []).map((u) => ({
    "@type": "Offer",
    name: `${a.nome} seminovo, ${gbl(u.gb)}, ${u.cor}, bateria ${u.bat}%`,
    price: u.p,
    priceCurrency: "BRL",
    itemCondition: "https://schema.org/UsedCondition",
    availability: "https://schema.org/InStock",
    url,
    seller: vendedor,
  }));
  const foto = Object.entries(fotos)
    .filter(([k]) => k.startsWith(`${a.id}|`))
    .map(([, f]) => `${site.url}${f.costas}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: a.nome,
    description: `${a.nome}: ${a.dest}. Tela ${a.tela}, chip ${a.chip}.`,
    brand: { "@type": "Brand", name: "Apple" },
    category: "Smartphone",
    url,
    ...(foto.length ? { image: foto } : {}),
    offers: [...novas, ...usadas],
  };
}
