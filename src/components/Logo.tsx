const LOGO_URL = "favicon.png";

const LOGO_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 92 92'><rect width='92' height='92' rx='16' fill='#0b1220'/><rect x='7' y='7' width='78' height='78' rx='11' fill='none' stroke='#c9a45c' stroke-opacity='.45' stroke-width='2'/><text x='46' y='61' font-family='Arial' font-size='46' font-weight='bold' fill='#c9a45c' text-anchor='middle'>Л</text></svg>`,
  );

export default function LogoMark() {
  return (
    <span className="logo-mark">
      <img
        src={LOGO_URL}
        alt=""
        onError={(e) => {
          (e.target as HTMLImageElement).src = LOGO_FALLBACK;
        }}
      />
    </span>
  );
}
