type P = { size?: number; className?: string };

const base = (size?: number) => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconScale = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v18M8 21h8M12 6l-5.5 2M12 6l5.5 2" />
    <path d="M3.5 13.5 6.5 8l3 5.5a3.2 3.2 0 0 1-6 0ZM14.5 13.5 17.5 8l3 5.5a3.2 3.2 0 0 1-6 0Z" />
  </svg>
);

export const IconShield = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3Z" />
    <path d="m9 11.5 2.2 2.2L15.5 9" />
  </svg>
);

export const IconClock = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconGavel = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m13.5 7.5 3 3M9 12l3 3M11.2 5.2l4.6 4.6a1 1 0 0 0 1.4 0l.6-.6a1 1 0 0 0 0-1.4L13.2 3.2a1 1 0 0 0-1.4 0l-.6.6a1 1 0 0 0 0 1.4ZM7 16.8l-3.8 3.7" />
    <path d="m10.4 8.6-4 4a1 1 0 0 0 0 1.4l.8.8a1 1 0 0 0 1.4 0l4-4M13 21h8" />
  </svg>
);

export const IconStar = ({ size, className }: P) => (
  <svg
    width={size ?? 18}
    height={size ?? 18}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95L12 2.6Z" />
  </svg>
);

export const IconCheck = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconChevronLeft = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.4}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </svg>
);

export const IconChevronRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.4}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </svg>
);

export const IconArrowUp = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const IconPlus = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconX = ({ size, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconPhone = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5.5 4h3l1.7 4.2-2.1 1.6a12.8 12.8 0 0 0 6.1 6.1l1.6-2.1L20 15.5v3a1.9 1.9 0 0 1-2 1.9C10.4 20 4 13.6 3.6 6a1.9 1.9 0 0 1 1.9-2Z" />
  </svg>
);

export const IconMail = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </svg>
);

export const IconPin = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const IconBriefcase = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
  </svg>
);

export const IconColumns = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 21h16M5 8.5h14M12 3 4 8h16l-8-5ZM6.5 8.5V18M10.2 8.5V18M13.8 8.5V18M17.5 8.5V18M4 18h16" />
  </svg>
);

export const IconQuote = ({ size, className }: P) => (
  <svg
    width={size ?? 22}
    height={size ?? 22}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M4 12.5C4 8.4 6.8 5.6 10.5 5v2.6c-2 .5-3.4 1.9-3.6 3.9h3.6V19H4v-6.5Zm9.5 0c0-4.1 2.8-6.9 6.5-7.5v2.6c-2 .5-3.4 1.9-3.6 3.9H20V19h-6.5v-6.5Z" />
  </svg>
);

export const IconSend = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z" />
  </svg>
);

export const IconTelegram = ({ size, className }: P) => (
  <svg
    width={size ?? 19}
    height={size ?? 19}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M21.9 4.1 18.8 19c-.2 1-.8 1.2-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.5L18 7.1c.4-.3-.1-.5-.5-.2L7.3 13.3l-4.4-1.4c-1-.3-1-1 .2-1.4l17.4-6.7c.8-.3 1.5.2 1.4.3Z" />
  </svg>
);

export const IconWhatsApp = ({ size, className }: P) => (
  <svg
    width={size ?? 19}
    height={size ?? 19}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8 8 0 1 1 6.9 3.8Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3 0-.2 0-.4-.1-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9a11 11 0 0 0 4.6 4.3c1.7.8 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3Z" />
  </svg>
);

export const IconMax = ({ size, className }: P) => (
  <svg
    width={size ?? 19}
    height={size ?? 19}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
    <path d="M8 16.2v-7l4 5 4-5v7" strokeWidth={2.1} />
  </svg>
);

export const IconDoc = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 16.5h6M9 9.5h2" />
  </svg>
);

export const IconHandshake = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m11.5 6.5-3.3 3.2a1.6 1.6 0 0 0 2.3 2.3l2.2-2.2 5.6 5.5a1.4 1.4 0 0 1-2 2l-2.4-2.3" />
    <path d="M2.5 7 7 4.5l4.5 2 4-2 6 3.5-2 5.5M13.7 17.4l-1.4 1.4a1.35 1.35 0 0 1-1.9-1.9" />
    <path d="m11.8 19.3-1 1a1.3 1.3 0 0 1-1.9-1.9" />
  </svg>
);

export const IconBrain = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M9.5 3.5A2.7 2.7 0 0 0 6.8 6.2c-1.7.4-2.8 1.8-2.8 3.6 0 .9.3 1.7.9 2.3a3.7 3.7 0 0 0 1.2 6c.5 1.4 1.8 2.4 3.4 2.4 1 0 1.9-.4 2.5-1V4.9a2.6 2.6 0 0 0-2.5-1.4Z" />
    <path d="M14.5 3.5a2.7 2.7 0 0 1 2.7 2.7c1.7.4 2.8 1.8 2.8 3.6 0 .9-.3 1.7-.9 2.3a3.7 3.7 0 0 1-1.2 6c-.5 1.4-1.8 2.4-3.4 2.4-1 0-1.9-.4-2.5-1" />
  </svg>
);

export const IconFist = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 11.5V6.8a1.6 1.6 0 0 1 3.2 0V11m0-5.4a1.6 1.6 0 0 1 3.2 0V11m0-3.4a1.6 1.6 0 0 1 3.2 0v6.2c0 3.9-2.6 6.7-6.3 6.7-3 0-4.6-1.6-6.4-4.9L2.5 12.8a1.5 1.5 0 0 1 2.4-1.8L7 13.5" />
  </svg>
);
