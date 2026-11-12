"use client";

import { IconSeta } from "./Icones";
import s from "./Hero.module.css";

/** Pílula do hero: rola até a vitrine (âncora) e pede para destacar o iPhone 18 Pro Max. */
export default function PilulaHero() {
  return (
    <a
      className={s.pill}
      href="#vitrine"
      onClick={() => window.dispatchEvent(new CustomEvent("rei-destacar", { detail: "18pm" }))}
    >
      iPhone 18 Pro Max <b>na vitrine</b>
      <span className={s.go}>
        <IconSeta />
      </span>
    </a>
  );
}
