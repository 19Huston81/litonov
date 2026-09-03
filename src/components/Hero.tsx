import { useEffect, useRef, useState } from "react";
import { IconClock, IconShield, IconGavel, IconColumns } from "./Icons";

const SPECIALIZATIONS = [
  "Семейное право",
  "Уголовные дела",
  "Гражданские споры",
  "Военное право",
  "Наследственные споры",
];

const BADGES = [
  { icon: <IconClock size={16} />, text: "Юридическая помощь 24/7" },
  { icon: <IconShield size={16} />, text: "Защита по уголовным делам" },
  { icon: <IconGavel size={16} />, text: "Защита участников СВО" },
  { icon: <IconColumns size={16} />, text: "Представительство в судах" },
];

/** Эффект печатающейся строки со сменой специализаций */
function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);
  const idx = useRef(0);

  useEffect(() => {
    let pos = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[idx.current];
      if (!deleting) {
        pos++;
        if (pos >= word.length) {
          pos = word.length;
          deleting = true;
          timer = setTimeout(tick, 2100);
          setText(word.slice(0, pos));
          return;
        }
        timer = setTimeout(tick, 65);
      } else {
        pos--;
        if (pos <= 0) {
          pos = 0;
          deleting = false;
          idx.current = (idx.current + 1) % words.length;
          timer = setTimeout(tick, 350);
          setText("");
          return;
        }
        timer = setTimeout(tick, 32);
      }
      setText(word.slice(0, pos));
    };

    timer = setTimeout(tick, 2400);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(SPECIALIZATIONS);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <span className="hero-ghost" aria-hidden="true">Ш</span>

      <div className="container hero-content">
        <div className="hero-kicker">
          <span className="pulse-dot" />
          Юрист · Н.Новгород · Новгородская область
        </div>

        <h1>
          <span className="line"><span>Литонов</span></span>
          <span className="line gold"><span>Александр</span></span>
          <span className="line gold"><span>Михайлович</span></span>
        </h1>

        <p className="hero-spec">
          <b>Специализация:</b> <span className="type-word">{typed}</span>
        </p>

        <p className="hero-desc">
          Квалифицированная юридическая помощь физическим и юридическим лицам.
          Более 5 лет в юриспруденции.
        </p>

        <div className="hero-actions">
          <a href="#contacts" className="btn btn-gold">Записаться на консультацию</a>
          <button className="btn btn-outline" onClick={scrollToServices}>Узнать об услугах</button>
        </div>

        <div className="hero-badges">
          {BADGES.map((b) => (
            <span className="hero-badge" key={b.text}>
              {b.icon}
              {b.text}
            </span>
          ))}
        </div>
      </div>

      <button className="hero-scroll" onClick={scrollToAbout} aria-label="Прокрутить вниз">
        <span className="wheel" />
        Прокрутить
      </button>
    </section>
  );
}