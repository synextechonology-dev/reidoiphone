# Rei do iPhone · site (cliente real da Synex)

Este arquivo é lido pelo Claude Code em toda sessão. Ele diz o que é o projeto, o que já foi decidido e como o código deve ser escrito.

## O que é

- Site da loja **Rei do iPhone**, de Santa Cruz do Rio Pardo (SP), do Felipe. Vende iPhones **novos e seminovos**.
- Projeto real, feito de graça pela Synex (amigo do João). Uso como portfólio a confirmar com o Felipe.
- Conversão: **WhatsApp**. Todo botão de compra abre o WhatsApp com a mensagem pronta (modelo, GB, cor, condição, bateria, preço e acessórios marcados). Retirada na loja ou entrega em Santa Cruz é combinada na conversa.
- A loja **não aceita usado na troca**. Não criar nada de troca.

## Fonte da verdade

| O quê | Onde |
|---|---|
| Layout, textos, seções, efeitos, comportamento | `previa/index.html` (abra no navegador) |
| Tokens, fontes e componentes | `docs/design-system.md` |
| O que ainda falta e o que é exemplo | `docs/pendencias.md` |
| Logo | `marca/` |
| Imagens de referência (NÃO publicar) | `midia-referencia/` |

A prévia é a referência visual. O site em Next.js deve ficar **igual** a ela em 1440, 768 e 390 px, nos dois temas. Não redesenhe, não troque textos e não invente seções.

## Stack (fixa)

- Next.js (App Router) + TypeScript
- CSS próprio com variáveis (`globals.css` com os tokens + CSS Modules). Sem Tailwind e sem biblioteca de UI.
- Fontes com `next/font/google`: Outfit, Inter, IBM Plex Mono e Geist (só no H1 do hero).
- Ícones em SVG de traço copiados da prévia (`src/components/Icones.tsx`). Sem biblioteca de ícones.
- GitHub + Vercel. Sem banco e sem servidor nesta versão.

## Rotas (obrigatório para SEO)

A prévia abre cada modelo em `#modelo-ID`. O Google lê isso como uma página só. No site, cada modelo tem endereço próprio, gerado de forma estática:

```
/                         home (todas as seções da prévia)
/iphone/[slug]            página do modelo (ex.: /iphone/iphone-13, /iphone/iphone-18-pro-max)
/privacidade  /cookies    LGPD
```

`generateStaticParams` a partir de `src/content/aparelhos.ts`. Cada página de modelo com `generateMetadata` (título "iPhone 13 seminovo e novo em Santa Cruz do Rio Pardo | Rei do iPhone"), dados estruturados `Product` + `Offer` e `LocalBusiness` na home. Sitemap e robots.

## Estrutura de pastas

```
src/
  app/  layout.tsx  page.tsx  globals.css  iphone/[slug]/page.tsx  privacidade/  cookies/  sitemap.ts  robots.ts  icon.png
  components/
    Abertura.tsx  Header.tsx  Hero.tsx  JeitoDoFelipe.tsx  Vitrine.tsx  CardNovo.tsx  CardSeminovo.tsx
    NavSeminovos.tsx  Quiz.tsx  Comparador.tsx  Avaliacoes.tsx  PedidoForm.tsx  Duvidas.tsx  OndeEstamos.tsx
    Rodape.tsx  BarraWhatsApp.tsx  BotaoTema.tsx  AvisoCookies.tsx  Aparelho.tsx  Icones.tsx
    modelo/  Galeria.tsx  RaioX.tsx  LeveJunto.tsx  FichaTecnica.tsx  NaCaixa.tsx
    efeitos/ Inclinar3D.tsx  NumeroQueConta.tsx  DeslizarLateral.tsx
  content/
    site.ts          nome, WhatsApp, endereço, horário, CNPJ, Instagram, link do Google
    aparelhos.ts     modelos, specs, cores, novos (GB e preço), seminovos (unidade a unidade)
    linhas.ts        linhas de seminovos (12, 13, 14, 15, 16) e seus modelos
    acessorios.ts    "Leve junto"
    duvidas.ts  avaliacoes.ts
  lib/whatsapp.ts    linkWhatsApp(mensagem) → https://wa.me/<numero>?text=...
public/marca/  public/fotos/  (fotos reais do Felipe; nunca as de midia-referencia)
```

Todo texto, preço e estoque fica em `src/content/`. Os dados de modelos estão no `<script>` da prévia (`const M`, `CORES`, `LINHAS`, `ACC`): copie de lá. Specs são oficiais; **preços e unidades são exemplo**.

## Seções da home (ordem da prévia)

1. Abertura (cortina sobe com o logo) · 2. Cabeçalho fixo com tema claro/escuro · 3. Hero "Quem entende de iPhone é o Rei" com imagem de fundo · 4. Do jeito do Felipe · 5. A vitrine do Rei (Novos | Seminovos → linha → modelo → um card por aparelho) · 6. Qual iPhone combina com você? · 7. Na dúvida entre dois? (sempre escuro) · 8. Quem comprou, recomenda (avaliações reais) · 9. Não achou o seu modelo? · 10. Dúvidas · 11. Venha ver de perto · 12. Rodapé · 13. Barra fixa de WhatsApp no mobile

## Efeitos (copiar da prévia)

| Efeito | Onde | Regra |
|---|---|---|
| Abertura | Entrada do site | Logo aparece, cortina preta sobe com linha dourada. 2,5 s. **Uma vez por sessão** (sessionStorage). Clique/tecla pula. Só começa com a página visível |
| Gradiente em movimento | Fundo do hero | 9 s, por baixo da imagem |
| Brilho no "é o Rei" | H1 do hero | Degradê dourado que passa a cada 6 s |
| Elevar no hover | Botões dourados | translateY(-6px) + sombra |
| Sublinhado que cresce | Links do menu | Do centro, dourado |
| Inclinar 3D | Cards de modelo (7°), preços (14°), foto da página do modelo (14°, mouse e dedo) | Só com hover fino; foto do modelo também com toque (touch-action: pan-y) |
| Deslizar da lateral | Comparador | Uma vez ao aparecer |
| Galeria | Página do modelo | Uma foto por vez; a próxima expande e a atual encolhe (flex-grow .7s); setas e contador |
| Raio-X | Foto de costas | Pontos brancos de 7 px (câmera, chip, bateria, conector) com etiqueta; reposicionar sobre a foto real |
| Números que contam | Ficha técnica e comparador | Exceto nomes de chip |

Todos respeitam `prefers-reduced-motion`. Disparo por `IntersectionObserver`, uma vez.

## Regras de código

- Mobile-first. Breakpoints 768, 1024, 1200. Nada pode passar da largura no celular.
- HTML semântico, um `h1` por página, toque mínimo de 44 px, foco visível em dourado, contraste AA.
- Efeitos e estado (vitrine, quiz, comparador, tema) em `"use client"`; o resto Server Component.
- `next/image` para fotos (WebP, até 150 KB). `object-fit: contain` em aparelhos: nunca cortar o celular.
- Tema salvo em localStorage com try/catch; padrão escuro.

## Marca e direitos

- Nunca publicar `midia-referencia/` (imagens com o logo da Apple). Trocar pelas fotos reais do Felipe.
- A maçã aparece só dentro do logo da loja, nunca como padrão ou decoração.
- Rodapé: "iPhone é marca registrada da Apple Inc. O Rei do iPhone é uma loja independente, sem vínculo com a Apple."

## Como trabalhar

- Opus para estrutura, design e efeitos; Sonnet para ajustes simples.
- Antes de dar uma etapa por pronta, compare com `previa/index.html` nas três larguras e nos dois temas.
- Commits pequenos, em português, um por seção.
