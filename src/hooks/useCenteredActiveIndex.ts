import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Tracks which item is currently nearest the viewport center.
 * Designed for "sticky sidebar + scrolling list" sections without fake 100vh spacers.
 */
export function useCenteredActiveIndex<T extends HTMLElement>(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<T | null>>([]);

  const setItemRef = useCallback(
    (index: number) =>
      (el: T | null) => {
        itemRefs.current[index] = el;
      },
    []
  );

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({
      // "Active" when element is roughly in the middle band of the viewport
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }),
    []
  );

  useEffect(() => {
    if (count <= 0) return;

    let raf = 0;

    const observer = new IntersectionObserver((entries) => {
      // Choose the most "present" intersecting entry to avoid flicker.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (visible.length === 0) return;

      const el = visible[0].target as T;
      const index = itemRefs.current.findIndex((n) => n === el);
      if (index < 0) return;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActiveIndex(index));
    }, observerOptions);

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [count, observerOptions]);

  return { activeIndex, setItemRef };
}
