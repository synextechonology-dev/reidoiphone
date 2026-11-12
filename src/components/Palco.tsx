import s from "./Cards.module.css";

/** Área da foto do aparelho no card, com as cantoneiras de 16 px. */
export default function Palco({
  children,
  tag,
}: {
  children: React.ReactNode;
  tag?: { texto: string; tipo: "new" | "soon" };
}) {
  return (
    <div className={s.stage}>
      <i className={`${s.corner} ${s.c1}`} />
      <i className={`${s.corner} ${s.c2}`} />
      <i className={`${s.corner} ${s.c3}`} />
      <i className={`${s.corner} ${s.c4}`} />
      {tag && <span className={`${s.tag} ${tag.tipo === "new" ? s.tagNew : s.tagSoon}`}>{tag.texto}</span>}
      {children}
    </div>
  );
}
