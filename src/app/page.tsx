import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JeitoDoFelipe from "@/components/JeitoDoFelipe";
import Avaliacoes from "@/components/Avaliacoes";
import PedidoForm from "@/components/PedidoForm";
import Duvidas from "@/components/Duvidas";
import OndeEstamos from "@/components/OndeEstamos";
import Rodape from "@/components/Rodape";
import BarraWhatsApp from "@/components/BarraWhatsApp";

// Etapa 2. A vitrine, "Qual iPhone combina com você?" e "Na dúvida entre dois?"
// entram na Etapa 3, entre "Do jeito do Felipe" e "Quem comprou, recomenda".
export default function Home() {
  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <JeitoDoFelipe />
        <Avaliacoes />
        <PedidoForm />
        <Duvidas />
        <OndeEstamos />
      </main>
      <Rodape />
      <BarraWhatsApp />
    </>
  );
}
