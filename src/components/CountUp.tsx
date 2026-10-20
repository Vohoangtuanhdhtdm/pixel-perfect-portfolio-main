import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: string; delay?: number };

function format(n: number, template: string): string {
  const decimals = template.split(".")[1]?.length ?? 0;
  const text = n.toFixed(decimals);
  // Keep zero-padded values like "01" padded while counting.
  return template.startsWith("0") && decimals === 0 ? text.padStart(template.length, "0") : text;
}

// Visible digits are decorative; screen readers get the final value once.
const CountUp = ({ value, delay = 0 }: CountUpProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const target = parseFloat(value);
  const [display, setDisplay] = useState(() => (reduceMotion ? value : format(0, value)));

  useEffect(() => {
    if (reduceMotion || Number.isNaN(target)) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v, value)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target, value, delay]);

  return (
    <>
      <span ref={ref} data-testid="countup" aria-hidden className="tabular-nums">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
};

export default CountUp;
