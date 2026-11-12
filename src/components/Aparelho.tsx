import Image from "next/image";
import { CORES, fotos, type Aparelho as Modelo } from "@/content/aparelhos";
import s from "./Aparelho.module.css";

type Props = {
  modelo: Pick<Modelo, "id" | "pro">;
  cor: string;
  /** classe do pai para dimensionar (largura) e posicionar */
  className?: string;
  style?: React.CSSProperties;
};

/** Foto real quando existir (public/fotos); senão, o desenho do aparelho da prévia. */
export default function Aparelho({ modelo, cor, className = "", style }: Props) {
  const foto = fotos[`${modelo.id}|${cor}`];
  if (foto) {
    return (
      <div className={`${s.dev} ${s.photo} ${className}`} style={style} aria-hidden="true">
        {/* unoptimized: o arquivo já é pequeno e sem perdas; reotimizar com perda traz de volta o fio claro na borda */}
        <Image src={foto.costas} alt="" width={foto.w} height={foto.h} unoptimized />
      </div>
    );
  }
  const vars = { "--c": CORES[cor] ?? "#888", ...style } as React.CSSProperties;
  return (
    <div className={`${s.dev} ${className}`} style={vars} aria-hidden="true">
      {modelo.pro ? (
        <div className={s.plate}>
          <i className={s.ln} />
          <i className={s.ln} />
          <i className={s.ln} />
          <i className={s.fl} />
          <i className={s.li} />
        </div>
      ) : (
        <div className={s.bump}>
          <i className={s.ln} />
          <i className={s.ln} />
        </div>
      )}
    </div>
  );
}
