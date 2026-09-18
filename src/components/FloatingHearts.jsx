import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const HEARTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 7) % 88)}%`,
  size: 8 + (i % 5) * 3,
  duration: 16 + (i % 6) * 3,
  delay: i * 1.1,
  opacity: 0.12 + (i % 4) * 0.05,
}));

export default function FloatingHearts() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!coarse);
  }, []);

  const hearts = useMemo(() => HEARTS, []);

  if (reduced || !enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-40px] text-blush-200"
          style={{
            left: heart.left,
            fontSize: heart.size,
            opacity: heart.opacity,
            animation: `float-heart ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
      <style>{`
        @keyframes float-heart {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate3d(12px, -110vh, 0) rotate(18deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
