import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconStar,
  IconQuote,
  IconChevronLeft,
  IconChevronRight,
} from "./Icons";

const REVIEWS = [
  {
    text: "Александр Михайлович — настоящий профессионал. Взялся за моё дело, когда другие отказывались. Благодаря его работе приговор был смягчён.",
    author: "Сергей К.",
    tag: "Уголовное дело",
  },
  {
    text: "Обратилась по вопросу раздела имущества. Александр чётко объяснил мои права, грамотно составил все документы. Суд мы выиграли!",
    author: "Марина К.",
    tag: "Семейный спор",
  },
  {
    text: "Помог с оформлением документов для нашей компании и сопровождением сделки. Работает быстро, ответственно. Стали постоянными клиентами.",
    author: "ООО «ТрансАвто»",
    tag: "Юридическое сопровождение",
  },
  {
    text: "Обратился по административному делу — лишение прав. Александр Михайлович нашел процессуальные нарушения, и дело прекратили. Спасибо!",
    author: "Дмитрий В.",
    tag: "Административное дело",
  },
  {
    text: "Помог оформить наследство после длительного спора. Очень внимательный и чуткий специалист. Всегда на связи, объясняет каждый шаг доступно.",
    author: "Светлана Р.",
    tag: "Наследственный спор",
  },
  {
    text: "Обратились как семья участника СВО. Александр провел бесплатную консультацию и помог разобраться с выплатами. Огромное спасибо!",
    author: "Семья Пупкиных",
    tag: "Защита семьи участника СВО",
  },
];

function initials(name: string) {
  return name
    .replace(/[«»]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = REVIEWS.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-head center" data-reveal>
          <span className="section-label">Мнения доверителей</span>
          <h2 className="section-title">
            <span className="accent">Отзывы</span>
          </h2>
        </div>

        <div
          className="reviews-wrap"
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="reviews-viewport"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div
              className="reviews-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <div className="review-slide" key={r.author}>
                  <div className="review-card">
                    <span className="review-quote-icon">
                      <IconQuote size={24} />
                    </span>
                    <div className="review-stars" aria-label="Оценка 5 из 5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconStar key={i} size={19} />
                      ))}
                    </div>
                    <blockquote>{r.text}</blockquote>
                    <div className="review-author">
                      <span className="review-avatar">
                        {initials(r.author)}
                      </span>
                      <div>
                        <b>{r.author}</b>
                        <span>{r.tag}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-nav">
            <button
              className="review-arrow"
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
            >
              <IconChevronLeft size={22} />
            </button>
            <div className="reviews-dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? "active" : ""}
                  onClick={() => setIndex(i)}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="review-arrow"
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
            >
              <IconChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
