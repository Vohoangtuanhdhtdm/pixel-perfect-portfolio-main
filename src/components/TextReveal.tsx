import { motion, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  text: string;
  // "mount" animates immediately (hero); "view" waits until scrolled into view.
  trigger?: "mount" | "view";
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Masked word-by-word slide-up. Padding + negative margin keep Vietnamese diacritics and descenders unclipped.
const TextReveal = ({ text, trigger = "view", delay = 0 }: TextRevealProps) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{text}</>;

  const words = text.split(" ");
  const animate = { y: "0%" };
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="-my-[0.15em] inline-block overflow-hidden py-[0.15em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              {...(trigger === "mount"
                ? { animate }
                : { whileInView: animate, viewport: { once: true, margin: "-60px" } })}
              transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
};

export default TextReveal;
