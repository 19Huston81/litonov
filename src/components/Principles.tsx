import { IconScale, IconBrain, IconHandshake, IconFist } from "./Icons";
import { useCountUp, useInView } from "../hooks/useCountUp";

const PRINCIPLES = [
  {
    num: "01",
    icon: <IconScale size={22} />,
    title: "Честности",
    text: "Всегда говорю правду о перспективах дела, даже если это неприятно слышать",
  },
  {
    num: "02",
    icon: <IconBrain size={22} />,
    title: "Разумности",
    text: "Взвешенные решения на основе глубокого анализа и многолетнего опыта",
  },
  {
    num: "03",
    icon: <IconHandshake size={22} />,
    title: "Добросовестности",
    text: "Максимальная вовлечённость в каждое дело, полная отдача интересам клиента",
  },
  {
    num: "04",
    icon: <IconFist size={22} />,
    title: "Принципиальности",
    text: "Отстаиваю права клиента до конца, не отступая перед сложностями",
  },
];

const STATS = [
  { target: 5, suffix: "+", label: "лет в юриспруденции" },
  { target: 300, suffix: "+", label: "дел завершено" },
  { target: 2, suffix: "+", label: "лет службы в следственных органах МВД" },
  { target: 98, suffix: "%", label: "довольных доверителей" },
];

function Stat({
  target,
  suffix,
  label,
  start,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const value = useCountUp(target, 1600 + delay, start);
  return (
    <div
      className="stat"
      data-reveal
      style={{ "--rd": `${delay}ms` } as React.CSSProperties}
    >
      <div className="stat-num">
        {value}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Principles() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <>
      <section className="section principles" id="principles">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-label">Почему я</span>
            <h2 className="section-title">
              Моя работа основана <span className="accent">на</span>
            </h2>
          </div>

          <div className="principles-grid">
            {PRINCIPLES.map((p, i) => (
              <article
                className="principle"
                data-reveal
                key={p.num}
                style={{ "--rd": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="principle-num">{p.num}</span>
                <div>
                  <h3>
                    {p.icon}
                    {p.title}
                  </h3>
                  <p>{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Ключевые цифры">
        <div className="container">
          <div className="stats-grid" ref={ref}>
            {STATS.map((s, i) => (
              <Stat key={s.label} {...s} start={inView} delay={i * 140} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
