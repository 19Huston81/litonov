import { IconScale } from "./Icons";

const ITEMS = [
  "Профессионализм",
  "Надёжность",
  "Честность",
  "Результат",
  "Гражданские споры",
  "Защита СВО",
  "Семейное право",
  "Исполнительное производство",
  "Более 5 лет опыта",
];

function Group() {
  return (
    <div className="marquee-group" aria-hidden="true">
      {ITEMS.map((t) => (
        <span className="marquee-item" key={t}>
          {t}
          <IconScale size={17} />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        <Group />
        <Group />
      </div>
      <span className="visually-hidden">{ITEMS.join(", ")}</span>
    </div>
  );
}
