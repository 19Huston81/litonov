import { useState } from "react";
import { IconPlus } from "./Icons";

const FAQ = [
  {
    q: "Сколько стоит первичная консультация?",
    a: "Первичная консультация платная, стоимость уточняйте по телефону. Бесплатная консультация — по четвергам с 15:00 до 17:00 для участников СВО и семьям погибших бойцов.",
  },
  {
    q: "Как быстро вы можете взяться за дело?",
    a: "В срочных случаях — в течение нескольких часов. После первого обращения согласовываем удобное время и приступаем к работе без промедлений.",
  },
  {
    q: "Работаете ли вы с делами в других городах?",
    a: "Да, работаю в Нижнем Новгороде и Новгородской области, а также в других регионах России. Консультацию можно получить дистанционно — по телефону, WhatsApp или Telegram.",
  },
  {
    q: "Возможна ли консультация онлайн?",
    a: "Да, консультация доступна онлайн через Telegram или WhatsApp. Напишите или позвоните — договоримся об удобном формате.",
  },
  {
    q: "Какие гарантии вы предоставляете?",
    a: "Честно оцениваю перспективы дела на первой консультации. Никаких ложных обещаний — только профессиональная работа и защита ваших интересов до конца.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container container-narrow">
        <div className="section-head center" data-reveal>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Частые <span className="accent">вопросы</span>
          </h2>
        </div>

        <div className="faq-list" data-reveal>
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <IconPlus size={18} />
                  </span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
