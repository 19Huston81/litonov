import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import SvoBanner from "./components/SvoBanner";
import Services from "./components/Services";
import Principles from "./components/Principles";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  // Модалка политики приватности открывается из формы и из подвала.
  const [privacy, setPrivacy] = useState(false);
  useReveal();

  return (
    <>
      <a className="visually-hidden" href="#main-content">
        Перейти к основному содержимому
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <SvoBanner />
        <Services />
        <Principles />
        <Reviews />
        <Faq />
        <Contacts onOpenPrivacy={() => setPrivacy(true)} />
      </main>
      <Footer
        privacyOpen={privacy}
        onOpenPrivacy={() => setPrivacy(true)}
        onClosePrivacy={() => setPrivacy(false)}
      />
    </>
  );
}