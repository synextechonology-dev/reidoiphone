import { site } from "@/content/site";

/** Link do WhatsApp com a mensagem pronta. Sem número em site.ts, abre sem destinatário. */
export function linkWhatsApp(mensagem: string): string {
  const numero = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
