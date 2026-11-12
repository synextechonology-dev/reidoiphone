import { fichaExtra, type Aparelho } from "@/content/aparelhos";
import {
  IconBateria,
  IconCamera,
  IconChip,
  IconConector,
  IconDisco,
  IconEscudo,
  IconTela,
} from "../Icones";
import s from "./Ficha.module.css";

const linhas = [
  { k: "tela", rotulo: "Tela", Icone: IconTela },
  { k: "chip", rotulo: "Chip", Icone: IconChip },
  { k: "cam", rotulo: "Câmera", Icone: IconCamera },
  { k: "arm", rotulo: "Armazenamento", Icone: IconDisco },
  { k: "con", rotulo: "Conector", Icone: IconConector },
] as const;

const iconeExtra = { escudo: IconEscudo, chip: IconChip, bateria: IconBateria };

export default function FichaTecnica({ modelo }: { modelo: Aparelho }) {
  return (
    <div>
      <h2 className="mp-h" style={{ marginBottom: 16 }}>
        Ficha técnica
      </h2>
      <dl className={s.specs}>
        {linhas.map(({ k, rotulo, Icone }) => (
          <div key={k}>
            <Icone />
            <dt>{rotulo}</dt>
            <dd>{modelo[k]}</dd>
          </div>
        ))}
        {fichaExtra.map((e) => {
          const Icone = iconeExtra[e.icone];
          return (
            <div key={e.rotulo}>
              <Icone />
              <dt>{e.rotulo}</dt>
              <dd>{e.valor}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
