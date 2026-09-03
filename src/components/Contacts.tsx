import { useState } from "react";
import {
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
  IconCheck,
  IconSend,
  IconTelegram,
  IconWhatsApp,
  IconMax,
} from "./Icons";

type Errors = { phone?: boolean; email?: boolean };

const YANDEX_ROUTES =
  "https://yandex.ru/maps/?from=mapframe&ll=27.649453%2C53.777555&mode=routes&rtext=~53.777555%2C27.649454&rtt=auto&ruri=~&source=mapframe&utm_source=mapframe&z=16";

/**
 * Куда уходят заявки.
 *
 * Основной вариант — send.php на вашем сервере (файл лежит в public/ и при
 * сборке попадает в корень dist/ рядом с сайтом). Работает на любом хостинге
 * с PHP; адрес получателя настраивается внутри send.php.
 *
 * Если хостинг без PHP (например, GitHub Pages — вернёт 404), автоматически
 * используется запасной бесплатный сервис FormSubmit: при первой отправке на
 * e-mail придёт письмо для активации, после клика заявки начнут приходить.
 */
const LOCAL_ENDPOINT = "send.php";
const FALLBACK_ENDPOINT = "https://formsubmit.co/ajax/huston81@mail.ru";

export default function Contacts({
  onOpenPrivacy,
}: {
  onOpenPrivacy: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    comment: "",
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (k === "phone" || k === "email")
        setErrors((er) => ({ ...er, [k]: false }));
    };

  const isPhoneOk = (v: string) => {
    const digits = v.replace(/\D/g, "");
    return (
      /^[+]?[0-9\s\-()]+$/.test(v.trim()) &&
      digits.length >= 10 &&
      digits.length <= 12
    );
  };
  const isEmailOk = (v: string) =>
    v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // honeypot: боты заполняют скрытое поле
    if (form.website) return;
    if (status === "sending") return;

    const next: Errors = {};
    if (!isPhoneOk(form.phone)) next.phone = true;
    if (!isEmailOk(form.email)) next.email = true;
    setErrors(next);

    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    if (next.phone || next.email) return;

    setStatus("sending");
    try {
      const payload = JSON.stringify({
        Имя: form.name || "—",
        Фамилия: form.surname || "—",
        Телефон: form.phone,
        "E-mail": form.email || "—",
        Комментарий: form.comment || "—",
        website: form.website, // honeypot (сервер отбросит заполненное)
        _subject: "Новая заявка с сайта юриста Литонова А.М.", // для FormSubmit
        _template: "table", // для FormSubmit
      });
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      let res = await fetch(LOCAL_ENDPOINT, {
        method: "POST",
        headers,
        body: payload,
      });
      // Хостинг без PHP (404/405) — пробуем запасной сервис
      if (res.status === 404 || res.status === 405) {
        res = await fetch(FALLBACK_ENDPOINT, {
          method: "POST",
          headers,
          body: payload,
        });
      }
      if (!res.ok) throw new Error("send failed");
      setSent(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contacts">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="section-label">Связаться</span>
          <h2 className="section-title">
            <span className="accent">Контакты</span>
          </h2>
        </div>

        <div className="contacts-grid">
          <div data-reveal="left">
            <div className="contact-cards">
              <div className="contact-card">
                <span className="contact-card-icon">
                  <IconPhone size={21} />
                </span>
                <small>Телефон</small>
                <a href="tel:+79081625159">+7 (908) 162-51-59</a>
              </div>
              <div className="contact-card">
                <span className="contact-card-icon">
                  <IconMail size={21} />
                </span>
                <small>E-mail</small>
                <a href="mailto:huston81@mail.ru">huston81@mail.ru</a>
              </div>
              <div className="contact-card">
                <span className="contact-card-icon">
                  <IconPin size={21} />
                </span>
                <small>Адрес</small>
                <span className="val">
                  г. Н.Новгород, Примерная ул., д. 16, стр. 1, помещ. 8/2
                </span>
              </div>
              <div className="contact-card">
                <span className="contact-card-icon">
                  <IconClock size={21} />
                </span>
                <small>Режим работы</small>
                <span className="val">
                  Пн–Пт: 9:00 – 18:00
                  <br />
                  Консультации 24/7
                </span>
              </div>
            </div>

            <div className="map-box">
              <div className="map-pin">
                <IconPin size={54} className="pin" />
                <b>Примерная улица, 16с1</b>
                <span>
                  г. Н. Новгород, Примерная ул., д. 16, стр. 1, помещ. 8/2
                </span>
                <div className="map-links">
                  <a href={YANDEX_ROUTES} target="_blank" rel="noreferrer">
                    <IconSend size={14} /> Как добраться
                  </a>
                  <a href={YANDEX_ROUTES} target="_blank" rel="noreferrer">
                    <IconPin size={14} /> Открыть в Картах
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal="right">
            <div className="form-card">
              {sent ? (
                <div className="form-success">
                  <span className="form-success-icon">
                    <IconCheck size={38} />
                  </span>
                  <h3>Заявка отправлена</h3>
                  <p>
                    Спасибо! Александр Михайлович свяжется с вами в ближайшее
                    время. В срочных случаях звоните: +7 (908) 162-51-59.
                  </p>
                </div>
              ) : (
                <>
                  <h3>Вам нужна помощь?</h3>
                  <p>
                    Заполните форму — Александр Михайлович свяжется с вами в
                    ближайшее время.
                  </p>

                  <form onSubmit={submit} noValidate>
                    {/* honeypot */}
                    <input
                      className="hp-field"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={set("website")}
                      placeholder="Website"
                    />

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="f-name">Имя</label>
                        <input
                          id="f-name"
                          type="text"
                          placeholder="Ваше имя"
                          value={form.name}
                          onChange={set("name")}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="f-surname">Фамилия</label>
                        <input
                          id="f-surname"
                          type="text"
                          placeholder="Ваша фамилия"
                          value={form.surname}
                          onChange={set("surname")}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className={`field${errors.phone ? " error" : ""}`}>
                        <label htmlFor="f-phone">
                          Телефон <span className="req">*</span>
                        </label>
                        <input
                          id="f-phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={form.phone}
                          onChange={set("phone")}
                        />
                        <span className="field-error">
                          Введите корректный номер телефона
                        </span>
                      </div>
                      <div className={`field${errors.email ? " error" : ""}`}>
                        <label htmlFor="f-email">E-mail</label>
                        <input
                          id="f-email"
                          type="email"
                          placeholder="you@mail.ru"
                          value={form.email}
                          onChange={set("email")}
                        />
                        <span className="field-error">
                          Проверьте формат e-mail
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="f-comment">Комментарий</label>
                      <textarea
                        id="f-comment"
                        placeholder="Кратко опишите вашу ситуацию…"
                        value={form.comment}
                        onChange={set("comment")}
                      />
                    </div>

                    <label
                      className={`consent${consentError ? " field-error-mode" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          setConsentError(false);
                        }}
                      />
                      <span className="consent-box">
                        <IconCheck size={14} />
                      </span>
                      <span className="consent-text">
                        Нажимая «Отправить», я даю согласие на обработку
                        персональных данных в соответствии с Федеральным законом
                        от 27.07.2006 № 152-ФЗ «О персональных данных» и
                        подтверждаю, что ознакомлен(а) с{" "}
                        <button type="button" onClick={onOpenPrivacy}>
                          Политикой в отношении обработки персональных данных
                        </button>
                      </span>
                    </label>
                    <p
                      className={`consent-error${consentError ? " show" : ""}`}
                    >
                      Необходимо согласие на обработку персональных данных
                    </p>

                    {status === "error" && (
                      <p className="form-send-error" role="alert">
                        Не удалось отправить заявку — проверьте подключение к
                        интернету. Позвоните по номеру{" "}
                        <a href="tel:+79081625159">+7 (908) 162-51-59</a> или
                        напишите в Telegram — либо повторите попытку.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-gold form-submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Отправка…" : "Отправить заявку"}
                      <IconSend size={17} />
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="messengers">
              <a
                className="messenger tg"
                href="https://t.me/@AlexLitonov"
                target="_blank"
                rel="noreferrer"
              >
                <IconTelegram size={19} />
                Написать в Telegram
              </a>
              <a
                className="messenger wa"
                href="https://wa.me/79081625159"
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsApp size={19} />
                Написать в WhatsApp
              </a>
              <a
                className="messenger mx"
                href="https://max.ru/u/7658765"
                target="_blank"
                rel="noreferrer"
              >
                <IconMax size={19} />
                Написать в MAX
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
