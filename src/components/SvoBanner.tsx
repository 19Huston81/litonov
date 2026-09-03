import { IconStar } from "./Icons";

export default function SvoBanner() {
  return (
    <section className="svo" id="svo">
      <div className="container">
        <div className="svo-banner" data-reveal="zoom">
          <div>
            <span className="svo-chip">
              <IconStar size={14} />
              Бесплатно для участников СВО
            </span>
            <h2>Бесплатная юридическая консультация для участников СВО и их семей</h2>
            <p>
              <b>По четвергам с 15:00 до 17:00 (МСК)</b> — вопросы прохождения военной службы,
              выплаты и льготы, социальные гарантии, защита прав военнослужащих, а также обжалование
              решений и иные связанные правовые вопросы.
            </p>
          </div>
          <a href="#contacts" className="btn btn-gold">Записаться</a>

          <IconStar size={230} className="svo-star" />
        </div>
      </div>
    </section>
  );
}