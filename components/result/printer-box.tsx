"use client";

import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { LAYOUTS } from "@/components/frames";
import { Sparkle } from "@/components/shared/sparkle";
import { Star5 } from "@/components/shared/star5";
import { usePrintAnimation } from "@/lib/hook/use-print-animation";
import { useConfetti } from "@/lib/hook/use-confetti";
import { PrinterMouth } from "./printer-mouth";
import w from "@/lib/wording.json";

interface PrinterBoxProps {
  photos: string[];
  layoutId: LayoutId;
  styleId: StyleId;
  meta: FrameMeta;
}

export function PrinterBox({ photos, layoutId, styleId, meta }: PrinterBoxProps) {
  const { printing, containerMinH, stripRef, stripWrapRef } = usePrintAnimation();
  const confetti = useConfetti();
  const layout = LAYOUTS[layoutId];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${printing ? "flex-1" : ""}`}
      style={{
        minHeight: containerMinH,
        background: "var(--paper-2)",
        border: "3px solid var(--ink)",
        boxShadow: "0 6px 0 var(--ink)",
      }}
    >
      {/* dot bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.4px)",
          backgroundSize: "18px 18px",
          opacity: 0.13,
        }}
      />

      <PrinterMouth printing={printing} />

      {/* shadow under printer mouth */}
      <div
        aria-hidden
        className="absolute right-0 left-0 z-[6]"
        style={{
          top: 56,
          height: 8,
          background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)",
        }}
      />

      {/* strip drop — GSAP target */}
      <div
        ref={stripRef}
        className="absolute left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-5 pb-8"
        style={{ top: 80 }}
      >
        <div ref={stripWrapRef}>{layout.render(photos, styleId, meta)}</div>
        <p
          className="font-hand text-2xl transition-opacity duration-400"
          style={{
            color: "var(--red)",
            transform: "rotate(-2deg)",
            opacity: printing ? 0 : 1,
            transitionDelay: "1.2s",
          }}
        >
          {w.result.printer.tearHere}
        </p>
      </div>

      {/* confetti */}
      {!printing &&
        confetti.map((c, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              animation: `confetti 2.4s ${c.delay}s ease-out infinite`,
            }}
          >
            {c.isStar ? (
              <Star5 x={0} y={0} size={14} color="var(--gold)" />
            ) : (
              <Sparkle x={0} y={0} size={12} color="var(--red)" />
            )}
          </div>
        ))}

      <style>{`
        @keyframes confetti {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(40vh) rotate(420deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
