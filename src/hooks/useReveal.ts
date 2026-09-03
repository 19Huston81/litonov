import { useEffect } from "react";

/**
 * Появление блоков при прокрутке (scroll reveal).
 * Вешает класс .in на элементы с атрибутом [data-reveal].
 */
export function initReveal() {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")
  );

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export function useReveal() {
  useEffect(() => {
    const cleanup = initReveal();
    return cleanup;
  }, []);
}