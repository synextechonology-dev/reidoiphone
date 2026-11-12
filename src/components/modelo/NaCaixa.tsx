import type { Aparelho } from "@/content/aparelhos";
import s from "./Ficha.module.css";

export default function NaCaixa({ modelo }: { modelo: Aparelho }) {
  return (
    <div>
      <h2 className="mp-h" style={{ marginBottom: 16 }}>
        Na caixa
      </h2>
      <div className={s.box}>
        <div>{modelo.nome}</div>
        <div>
          {modelo.con === "USB-C" ? "Cabo USB-C" : "Cabo USB-C para Lightning"}
          <small>{modelo.novo ? "Original da Apple" : "Original, quando o dono anterior entregou"}</small>
        </div>
        <div>
          Sem carregador<small>A Apple não inclui a fonte desde o iPhone 12</small>
        </div>
      </div>
      <h2 className="mp-h" style={{ margin: "40px 0 16px" }}>
        Garantia e procedência
      </h2>
      <div className={s.box}>
        <div>
          Garantia de <span className="tbc">X meses</span>
          <small>{modelo.novo ? "Novo, lacrado" : "Seminovo conferido pela loja"}</small>
        </div>
        <div>
          Nota fiscal
          <small>
            <span className="tbc">a confirmar</span>
          </small>
        </div>
      </div>
    </div>
  );
}
