import { useEffect, useState } from "react";
import { IconScale } from "./Icons";
import { initReveal } from "../hooks/useReveal";

const EXPERIENCE = [
  {
    years: "2008 — 2014",
    title: "Помощник адвоката, юрист, юрисконсульт",
    text: "Работа в различных организациях: правовое сопровождение, договорная работа, представительство интересов.",
  },
  {
    years: "2015 — 2019",
    title: "Следователь следственных подразделений МВД России",
    text: "Расследование уголовных дел, работа с доказательствами, процессуальные решения.",
  },
  {
    years: "2019 — 2021",
    title: "Научный сотрудник Певекского юридического института МВД России",
    text: "Научно-исследовательская и преподавательская деятельность в области юриспруденции.",
  },
  {
    years: "2021 — 2024",
    title: "Следователь следственных подразделений МВД России",
    text: "Продолжение службы в следственных органах: сложные многоэпизодные дела, аналитика следственной практики.",
  },
  {
    years: "2025 — н.в.",
    title: "Адвокат такой-то коллегии адвокатов",
    text: "Певекский районный филиал. Защита прав и законных интересов доверителей по всем категориям дел.",
  },
];

const EDUCATION = [
  {
    years: "2013",
    title: "МГЮА имени С.М. Козяйчева",
    text: "Факультет: правоведение. Квалификация: юрист.",
  },
  {
    years: "2020 — с отличием",
    title: "Певекский государственный университет, г. Билибино",
    text: "Квалификация: магистр юриспруденции.",
  },
  {
    years: "2020 — с отличием",
    title: "Айонский государственный нефтяной технический университет",
    text: "Квалификация: магистр нефти и газа.",
  },
];

// ============================================================
// Цитаты для блока «Обо мне»: при каждой загрузке страницы
// случайным образом показывается одна из них.
// Подставьте свои тексты — формат { text, author } не меняйте.
// ============================================================
const QUOTES = [
  {
    text: "Мы должны быть рабами законов, чтобы стать свободными",
    author: "Марк Туллий Цицерон",
  },
  {
    text: "Поступай так, чтобы максима твоего поступка могла бы стать основой всеобщего закона",
    author: "Иммануил Кант",
  },
  {
    text: "Законы подобны паутине: мелкие насекомые в ней запутываются, большие — никогда",
    author: "Фрэнсис Бэкон",
  },
  {
    text: "Незнание закона не освобождает от ответственности. А вот знание нередко освобождает",
    author: "Станислав Ежи Лец",
  },
  {
    text: "Закон есть разум, свободный от страсти",
    author: "Аристотель",
  },
  {
    text: "Свобода есть право делать всё, что дозволено законами",
    author: "Шарль Луи Монтескье",
  },
  // … добавьте столько объектов, сколько у вас цитат
];

const PORTRAIT_URL = "photo.jpg";

const FALLBACK_PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 540 720'><rect width='540' height='720' fill='#15223c'/><rect x='14' y='14' width='512' height='692' fill='none' stroke='#c9a45c' stroke-opacity='.35' stroke-width='2'/><circle cx='270' cy='270' r='92' fill='#0d1628' stroke='#c9a45c' stroke-width='3'/><path d='M130 640c18-120 74-180 140-180s122 60 140 180' fill='#0d1628' stroke='#c9a45c' stroke-width='3'/><text x='270' y='700' font-family='Arial' font-size='26' fill='#c9a45c' text-anchor='middle' font-weight='bold'>ФОТО</text></svg>`,
  );

function Timeline({
  items,
}: {
  items: { years: string; title: string; text: string }[];
}) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div
          className="timeline-item"
          data-reveal
          key={it.years + i}
          style={{ "--rd": `${i * 70}ms` } as React.CSSProperties}
        >
          <span className="timeline-year">{it.years}</span>
          <h4>{it.title}</h4>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const [tab, setTab] = useState<"bio" | "exp" | "edu">("exp");

  // Случайная цитата выбирается один раз при загрузке страницы
  const [quote] = useState(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
  );

  // При смене вкладки элементы таймлайна появляются заново —
  // повторно инициализируем scroll-reveal для новых узлов.
  useEffect(() => {
    const cleanup = initReveal();
    return cleanup;
  }, [tab]);

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-photo" data-reveal="left">
            <div className="about-photo-frame">
              <img
                src={PORTRAIT_URL}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PORTRAIT;
                }}
                alt="Юрист Литонов Александр Михайлович"
                loading="lazy"
              />
            </div>
            <div className="about-exp-badge">
              <b>5+</b>
              <span>лет в юриспруденции</span>
            </div>
          </div>

          <div className="about-text" data-reveal="right">
            <span className="section-label">Обо мне</span>
            <h2 className="section-title">
              Александр <span className="accent">Михайлович</span> Литонов
            </h2>
            <p>
              Я являюсь адвокатом <b>такой-то коллегии адвокатов</b> (Певекский
              районный филиал). Профессия юриста — это больше, чем просто
              работа. Это призвание, требующее глубокой ответственности, знания
              законодательства и готовности помогать людям в трудных ситуациях.
            </p>
            <p>
              Для меня быть юристом — значит быть опорой для тех, кто нуждается
              в защите закона, и способствовать справедливости в обществе.
            </p>

            <blockquote className="about-quote">
              «{quote.text}»<footer>— {quote.author}</footer>
            </blockquote>

            <div className="about-status">
              <span className="about-status-icon">
                <IconScale size={26} />
              </span>
              <div>
                <b>Адвокат такой-то коллегии адвокатов</b>
                <span>г. Н. Новгород · Певекский районный филиал</span>
              </div>
            </div>

            <a href="#contacts" className="btn btn-gold">
              Записаться на консультацию
            </a>
          </div>
        </div>

        <div className="about-tabs" data-reveal>
          <div
            className="tabs-nav"
            role="tablist"
            aria-label="Биография, опыт и образование"
          >
            <button
              role="tab"
              aria-selected={tab === "bio"}
              className={`tab-btn${tab === "bio" ? " active" : ""}`}
              onClick={() => setTab("bio")}
            >
              Биография
            </button>
            <button
              role="tab"
              aria-selected={tab === "exp"}
              className={`tab-btn${tab === "exp" ? " active" : ""}`}
              onClick={() => setTab("exp")}
            >
              Опыт работы
            </button>
            <button
              role="tab"
              aria-selected={tab === "edu"}
              className={`tab-btn${tab === "edu" ? " active" : ""}`}
              onClick={() => setTab("edu")}
            >
              Образование
            </button>
          </div>

          <div
            className={`tab-panel${tab === "bio" ? " active" : ""}`}
            role="tabpanel"
          >
            <div className="tab-bio-text">
              <p>
                Путь в профессии начался в 2018 году с должности помощника
                адвоката. За годы работы юристом и юрисконсультом я освоил
                договорную и претензионную работу, научилсь видеть спор глазами
                обеих сторон.
              </p>
              <p>
                Почти два года службы в{" "}
                <b>следственных подразделениях МВД России</b> и научная работа в
                Певекском юридическом институте дали главное — понимание того,
                как принимается решение по уголовному делу{" "}
                <b>изнутри системы</b>. Этот опыт сегодня работает на стороне
                защиты.
              </p>
              <p>
                С 2025 года — адвокат <b>такой-то коллегии адвокатов</b>. Веду
                уголовные, гражданские, административные, семейные и
                наследственные дела в Нижнем Новгороде, Новгородской области и
                других регионах России.
              </p>
            </div>
          </div>

          <div
            className={`tab-panel${tab === "exp" ? " active" : ""}`}
            role="tabpanel"
          >
            <Timeline items={EXPERIENCE} />
          </div>

          <div
            className={`tab-panel${tab === "edu" ? " active" : ""}`}
            role="tabpanel"
          >
            <Timeline items={EDUCATION} />
          </div>
        </div>
      </div>
    </section>
  );
}
