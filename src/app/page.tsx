import { JsonLd, dadosLocalBusiness } from "@/lib/jsonld";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JeitoDoFelipe from "@/components/JeitoDoFelipe";
import Vitrine from "@/components/Vitrine";
import Quiz from "@/components/Quiz";
import Comparador from "@/components/Comparador";
import Avaliacoes from "@/components/Avaliacoes";
import PedidoForm from "@/components/PedidoForm";
import Duvidas from "@/components/Duvidas";
import OndeEstamos from "@/components/OndeEstamos";
import Rodape from "@/components/Rodape";
import BarraWhatsApp from "@/components/BarraWhatsApp";

export default function Home() {
  return (
    <>
      <JsonLd dados={dadosLocalBusiness()} />
      <Header />
      <main id="inicio">
        <Hero />
        <JeitoDoFelipe />
        <Vitrine />
        <Quiz />
        <Comparador />
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
