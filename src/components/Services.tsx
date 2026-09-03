import { IconScale, IconColumns, IconCheck } from "./Icons";

const PERSONAL = [
  "Гражданские дела",
  "Военное право",
  "Административные дела",
  "Семейные и наследственные споры",
  "Дела об административных правонарушениях",
  "Исполнительное производство",
  "Налоговые дела",
  "Составление обращений, исковых заявлений, жалоб и ходатайств",
];

const CORPORATE = [
  "Составление договоров",
  "Имущественные споры",
  "Возмещение убытков",
  "Досудебное урегулирование",
  "Составление исков",
  "Сопровождение сделок",
  "Составление правовых документов",
  "Проверка договоров и правовых документов",
];

function ServiceCard({
  icon,
  title,
  items,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  delay: number;
}) {
  return (
    <article
      className="service-card"
      data-reveal
      style={{ "--rd": `${delay}ms` } as React.CSSProperties}
    >
      <div className="service-card-head">
        <span className="service-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <IconCheck size={15} />
            {item}
          </li>
        ))}
      </ul>
      <a className="service-link" href="#contacts">
        Записаться на консультацию
      </a>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head center" data-reveal>
          <span className="section-label">Практика</span>
          <h2 className="section-title">
            Услуги <span className="accent">юриста</span>
          </h2>
        </div>

        <div className="services-grid">
          <ServiceCard
            icon={<IconScale size={26} />}
            title="Для физических лиц"
            items={PERSONAL}
            delay={0}
          />
          <ServiceCard
            icon={<IconColumns size={26} />}
            title="Для юридических лиц"
            items={CORPORATE}
            delay={120}
          />
        </div>
      </div>
    </section>
  );
}
