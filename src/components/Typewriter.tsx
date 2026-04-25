import { useEffect, useState } from "react";

interface TypewriterProps {
  /** Phrases to cycle through */
  phrases: string[];
  /** Per-character typing speed in ms */
  typeSpeed?: number;
  /** Per-character deletion speed in ms */
  deleteSpeed?: number;
  /** Pause when a phrase is fully typed (ms) */
  holdMs?: number;
  /** Pause after a phrase is deleted before typing the next (ms) */
  delayMs?: number;
  className?: string;
}

/**
 * Accessible typewriter: types and deletes a list of phrases on a loop.
 * Renders the live phrase with an animated caret. We respect reduced-motion
 * by collapsing to a static rotation of the first phrase.
 */
export function Typewriter({
  phrases,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdMs = 1800,
  delayMs = 350,
  className,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "delaying">("typing");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setText(phrases[0] ?? "");
      return;
    }

    const current = phrases[phraseIdx % phrases.length] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        timer = setTimeout(() => setPhase("delaying"), 0);
      }
    } else if (phase === "delaying") {
      timer = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, delayMs);
    }

    return () => clearTimeout(timer);
  }, [text, phase, phraseIdx, phrases, typeSpeed, deleteSpeed, holdMs, delayMs]);

  const words = text.split(" ");
  const lastWord = words.pop();
  const restText = words.length > 0 ? words.join(" ") + " " : "";

  return (
    <span className={className}>
      <span className="text-gradient" aria-live="polite">
        {restText}
        <span className="whitespace-nowrap">
          {lastWord}
          <span
            aria-hidden
            className="inline-block w-[3px] md:w-[4px] h-[0.9em] -mb-[0.08em] ml-1 bg-secondary align-middle animate-pulse rounded-sm"
          />
        </span>
      </span>
    </span>
  );
}
