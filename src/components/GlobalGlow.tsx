import { useEffect, useRef } from "react";

// Update only the decorative element, without re-rendering the page on pointer movement.
export default function GlobalGlow() {
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (nextX: number, nextY: number) => {
      if (reduced.matches) return;
      x = nextX;
      y = nextY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        if (glow.current) {
          glow.current.style.transform = `translate3d(${x - 120}px, ${y - 120}px, 0)`;
          glow.current.style.opacity = "1";
        }
        frame = 0;
      });
    };
    const pointer = (event: PointerEvent) => move(event.clientX, event.clientY);
    const hide = () => {
      if (glow.current) glow.current.style.opacity = "0";
    };
    const preference = () => {
      if (reduced.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        hide();
      }
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    reduced.addEventListener("change", preference);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  return (
    <div
      ref={glow}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-20 h-60 w-60 rounded-full opacity-0 blur-3xl"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / .12), transparent 70%)",
        willChange: "transform",
        transition: "opacity .3s",
      }}
    />
  );
}
