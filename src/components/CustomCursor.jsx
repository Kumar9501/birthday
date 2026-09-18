import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return undefined;

    document.documentElement.classList.add("has-custom-cursor");
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (cursor) {
        cursor.style.transform = `translate3d(${x - 7}px, ${y - 7}px, 0)`;
      }
    };

    const loop = () => {
      tx += (x - tx) * 0.16;
      ty += (y - ty) * 0.16;
      if (trail) {
        trail.style.transform = `translate3d(${tx - 14}px, ${ty - 14}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-7 w-7 rounded-full border border-blush-300/40 bg-blush-200/10 blur-[0.4px] md:block"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden text-[14px] leading-none text-blush-200 drop-shadow-[0_0_8px_rgba(232,196,196,0.55)] md:block"
      >
        ♥
      </div>
    </>
  );
}
