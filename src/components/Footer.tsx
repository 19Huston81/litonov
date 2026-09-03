import { useEffect, useState } from "react";
import { IconPhone, IconMail, IconPin, IconArrowUp, IconX } from "./Icons";
import LogoMark from "./Logo";

function PrivacyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  return (
    <div
      className={`modal-overlay${open ? " open" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Политика обработки персональных данных"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <IconX size={18} />
        </button>
        <h3>Политика в отношении обработки персональных данных</h3>
        <p>
          Настоящая политика определяет порядок обработки персональных данных
          пользователей сайта юриста Литонова Александра Михайловича в
          соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О
          персональных данных».
        </p>
        <p>
          <b style={{ color: "var(--text)" }}>
            1. Какие данные обрабатываются.
          </b>{" "}
          Через форму обратной связи вы передаёте: имя, фамилию, номер телефона,
          адрес электронной почты и содержание комментария. Данные используются
          исключительно для связи с вами и подготовки консультации.
        </p>
        <p>
          <b style={{ color: "var(--text)" }}>2. Правовое основание.</b> Данные
          обрабатываются с вашего согласия, выражаемого отметкой
          соответствующего поля перед отправкой формы.
        </p>
        <p>
          <b style={{ color: "var(--text)" }}>3. Хранение и защита.</b> Данные
          не передаются третьим лицам, за исключением случаев, предусмотренных
          законодательством РФ, и хранятся с соблюдением необходимых мер защиты.
        </p>
        <p>
          <b style={{ color: "var(--text)" }}>4. Ваши права.</b> Вы можете в
          любой момент отозвать согласие, запросить уточнение или удаление своих
          данных, направив обращение на e-mail huston81@mail.ru или по телефону
          +7 (908) 162-51-59.
        </p>
      </div>
    </div>
  );
}

export default function Footer({
  privacyOpen,
  onOpenPrivacy,
  onClosePrivacy,
}: {
  privacyOpen: boolean;
  onOpenPrivacy: () => void;
  onClosePrivacy: () => void;
}) {
  const [toTop, setToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setToTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#top" className="logo" style={{ marginBottom: 20 }}>
                <LogoMark />
                <span className="logo-text">
                  <strong>Юрист Литонов</strong>
                  <span>Н. Новгород · Новгородская область</span>
                </span>
              </a>
              <p>
                Квалифицированная юридическая помощь физическим и юридическим
                лицам. Более 5 лет в юриспруденции. Защита прав и законных
                интересов до конца.
              </p>
            </div>

            <div>
              <h4>Разделы</h4>
              <div className="footer-nav">
                <a href="#about">Обо мне</a>
                <a href="#services">Услуги адвоката</a>
                <a href="#svo">Бесплатно для участников СВО</a>
                <a href="#reviews">Отзывы</a>
                <a href="#faq">Частые вопросы</a>
                <a href="#contacts">Контакты</a>
              </div>
            </div>

            <div>
              <h4>Контакты</h4>
              <div className="footer-contacts">
                <a href="tel:+79081625159">
                  <IconPhone size={16} /> +7 (908) 162-51-59
                </a>
                <a href="mailto:huston81@mail.ru">
                  <IconMail size={16} /> huston81@mail.ru
                </a>
                <a
                  href="https://yandex.ru/maps/?from=mapframe&ll=27.649453%2C53.777555&mode=routes&rtext=~53.777555%2C27.649454&rtt=auto&ruri=~&source=mapframe&utm_source=mapframe&z=16"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconPin size={16} /> г. Н.Новгород, Примерная ул., д. 16,
                  стр. 1
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 Юрист Литонов Александр Михайлович. Все права защищены.
            </span>
            <button onClick={onOpenPrivacy}>
              Политика обработки персональных данных
            </button>
          </div>
        </div>
      </footer>

      <button
        className={`to-top${toTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Наверх"
      >
        <IconArrowUp size={21} />
      </button>

      <PrivacyModal open={privacyOpen} onClose={onClosePrivacy} />
    </>
  );
}
