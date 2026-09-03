import { useEffect, useState } from "react";
import LogoMark from "./Logo";
// import { IconX } from "./Icons";

const NAV = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#principles", label: "Принципы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "Вопросы" },
];

// Разделы, за которыми «следит» scroll-spy (контакты есть только в мобильном меню,
// но отслеживаем их тоже, чтобы пункт «Контакты» подсвечивался внизу страницы)
const SPY = [...NAV.map((n) => n.href), "#contacts"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // scroll-spy: активным считается последний раздел, чей верх
      // уже прокручен выше контрольной линии (шапка + запас)
      let current = "";
      for (const href of SPY) {
        const el = document.querySelector(href);
        if (el && (el as HTMLElement).offsetTop - 140 <= window.scrollY) {
          current = href;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокировка прокрутки фона под открытым мобильным меню.
  // ВАЖНО: используем только класс overflow: hidden + блокировку touchmove.
  // НЕ ставим body position: fixed — на iOS Safari фиксированный body ломает
  // position: fixed шапки, и логотип оказывается под контентом страницы.
  useEffect(() => {
    document.body.classList.toggle("menu-open", menu);

    const onTouchMove = (e: TouchEvent) => {
      const t = e.target as HTMLElement | null;
      // прокрутка разрешена только внутри самого меню
      if (t && t.closest(".mobile-menu")) return;
      e.preventDefault();
    };

    if (menu) {
      document.addEventListener("touchmove", onTouchMove, { passive: false });
    }
    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.body.classList.remove("menu-open");
    };
  }, [menu]);

  // Закрыть меню и плавно прокрутить к выбранному разделу
  const closeAndGo =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMenu(false);
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };

  return (
    <>
      <header
        className={`site-header${scrolled ? " scrolled" : ""}${menu ? " menu-open" : ""}`}
      >
        <div className="container header-inner">
          <a href="#top" className="logo" onClick={closeAndGo("#top")}>
            <LogoMark />
            <span className="logo-text">
              <strong>Юрист Литонов</strong>
              <span>Н.Новгород · Новгородская область</span>
            </span>
          </a>

          <nav className="main-nav" aria-label="Основная навигация">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={active === n.href ? "active" : ""}
                aria-current={active === n.href ? "true" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            <a href="tel:+79081625159" className="header-phone">
              +7 (908) 162-51-59
            </a>
            <a href="#contacts" className="btn btn-gold btn-sm">
              Консультация
            </a>
          </div>

          <button
            className={`burger${menu ? " open" : ""}`}
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu${menu ? " open" : ""}`}>
          <nav aria-label="Мобильная навигация">
            {[...NAV, { href: "#contacts", label: "Контакты" }].map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={closeAndGo(n.href)}
                className={active === n.href ? "active" : ""}
                aria-current={active === n.href ? "true" : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a href="tel:+79081625159" className="mobile-phone">
            +7 (908) 162-51-59
          </a>
          <a
            href="#contacts"
            className="btn btn-gold"
            onClick={closeAndGo("#contacts")}
          >
            Записаться на консультацию
          </a>
        </div>
      </header>
    </>
  );
}
