"use client";

/** Reabre o aviso de cookies para a pessoa mudar a escolha (LGPD: revogação). */
export default function ReverCookies() {
  return (
    <button
      type="button"
      className="btn btn-line btn-sm"
      onClick={() => {
        try {
          localStorage.removeItem("rei-cookies");
        } catch {
          /* sem localStorage: só reabre o aviso */
        }
        window.dispatchEvent(new Event("rei-cookies-abrir"));
      }}
    >
      Rever minha escolha de cookies
    </button>
  );
}
