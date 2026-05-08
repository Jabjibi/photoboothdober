"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";

import { BoothCanvas } from "@/components/booth/booth-canvas";
import { Sparkle } from "@/components/shared/sparkle";
import { Star5 } from "@/components/shared/star5";
import { Heart } from "@/components/shared/heart";

type Phase = "idle" | "zooming" | "curtain";

interface BoothScreenProps {
  onStart?: () => void;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function BoothScreen({ onStart }: BoothScreenProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const boothWrapRef = useRef<HTMLDivElement>(null);

  // Server returns false → skip bgItems during SSR; client returns true → render them
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const bgItems = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: seededRandom(i * 3) * 100,
        y: seededRandom(i * 3 + 1) * 100,
        size: 8 + seededRandom(i * 3 + 2) * 18,
        delay: seededRandom(i * 5) * 2,
        type: i % 3,
      })),
    []
  );

  /* ── Animation: zoom in → navigate directly, no revert ── */
  const handleStart = () => {
    if (phase !== "idle" || !boothWrapRef.current) return;
    setPhase("zooming");
    gsap.to(boothWrapRef.current, {
      scale: 2.6,
      y: "4%",
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        setPhase("curtain");
        setTimeout(() => onStart?.(), 1900); // curtain CSS: 0.4s delay + 1.4s duration
      },
    });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      {/* grain + radial bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(216,32,31,0.08), transparent 60%), radial-gradient(var(--ink) 1px, transparent 1.4px)",
          backgroundSize: "auto, 22px 22px",
          opacity: 0.5,
        }}
      />

      {/* corner — top left (hidden on mobile to avoid overlap) */}
      <div className="absolute left-6 top-20 z-10 pointer-events-none hidden sm:block">
        <p className="font-hand text-2xl sm:text-3xl leading-none" style={{ color: "var(--red)" }}>
          ✦ step right up
        </p>
        <p
          className="font-mono-booth text-[10px] sm:text-[11px] mt-1"
          style={{ letterSpacing: "0.15em", color: "var(--ink)" }}
        >
          EST. 2026 · OPEN 24H
        </p>
      </div>

      {/* corner — top right (hidden on mobile to avoid overlap) */}
      <div className="absolute right-6 top-20 z-10 text-right pointer-events-none hidden sm:block">
        <p className="font-news text-xl sm:text-2xl leading-none" style={{ color: "var(--ink)" }}>
          NO COINS REQUIRED
        </p>
        <p
          className="font-mono-booth text-[10px] sm:text-[11px] mt-1"
          style={{ letterSpacing: "0.15em", color: "var(--red)" }}
        >
          ONE WINK · ONE PRINT
        </p>
      </div>

      {/* bg sparkle field — 8 items on mobile, all 28 on sm+ */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* first 8: always visible */}
        {mounted && bgItems.slice(0, 8).map((item, i) => {
          if (item.type === 0) return <Sparkle key={i} x={item.x} y={item.y} size={item.size} delay={item.delay} color="var(--red)" />;
          if (item.type === 1) return <Star5 key={i} x={item.x} y={item.y} size={item.size} delay={item.delay} color="var(--gold)" rotate={seededRandom(i * 7) * 90} />;
          return <Heart key={i} x={item.x} y={item.y} size={item.size} delay={item.delay} />;
        })}
        {/* items 9-28: hidden on mobile; display:contents on sm+ so child SVGs
            still position relative to this inset-0 parent (not the wrapper) */}
        <div className="mobile-hide">
          {mounted && bgItems.slice(8).map((item, i) => {
            const idx = i + 8;
            if (item.type === 0) return <Sparkle key={idx} x={item.x} y={item.y} size={item.size} delay={item.delay} color="var(--red)" />;
            if (item.type === 1) return <Star5 key={idx} x={item.x} y={item.y} size={item.size} delay={item.delay} color="var(--gold)" rotate={seededRandom(idx * 7) * 90} />;
            return <Heart key={idx} x={item.x} y={item.y} size={item.size} delay={item.delay} />;
          })}
        </div>
      </div>

      {/* ground hint — hidden on mobile to avoid overlap with button */}
      <div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none hidden sm:block"
        style={{ bottom: "8%", height: 1, background: "var(--ink)", opacity: 0.15, zIndex: 1 }}
      />
      <p
        className="font-hand absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl pointer-events-none hidden sm:block"
        style={{ bottom: "5%", color: "var(--ink)", opacity: 0.55, zIndex: 1 }}
      >
        ↓ tap the booth to enter ↓
      </p>

      {/* centre column */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 sm:gap-7" style={{ zIndex: 10 }}>
        {/* halo */}
        <div
          aria-hidden
          className="absolute animate-halo pointer-events-none"
          style={{
            width: "min(720px, 90vw)",
            aspectRatio: "1",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,200,200,0.6), rgba(251,246,238,0) 60%)",
            zIndex: 0,
          }}
        />

        {/* booth wrap — GSAP zoom target */}
        <div
          ref={boothWrapRef}
          style={{ transformOrigin: "50% 60%", position: "relative", zIndex: 1 }}
        >
          {/* BoothCanvas: z-index 1 within this container */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <BoothCanvas curtainOpen={phase === "curtain"} />
          </div>

          {/* orbit ring: hidden on mobile, shown sm+ */}
          <div
            aria-hidden
            className="animate-spin-slow pointer-events-none hidden sm:block"
            style={{
              position: "absolute",
              inset: "-8%",
              border: "2px dashed var(--ink)",
              borderRadius: "50%",
              opacity: 0.18,
              zIndex: 2,
            }}
          />

          {/* floating label: 4 SHOTS — z-index 10 to stay above booth */}
          <div
            className="animate-float absolute hidden sm:block"
            style={{
              left: "-14%",
              top: "13%",
              ["--float-r" as string]: "-12deg",
              zIndex: 10,
            }}
          >
            <div
              className="font-display text-base sm:text-lg"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                padding: "6px 12px",
                borderRadius: 8,
                boxShadow: "4px 4px 0 var(--red)",
              }}
            >
              4 SHOTS
            </div>
          </div>

          {/* floating label: cute mode */}
          <div
            className="animate-float absolute hidden sm:block"
            style={{
              right: "-16%",
              top: "33%",
              animationDelay: "0.8s",
              ["--float-r" as string]: "8deg",
              zIndex: 10,
            }}
          >
            <div
              className="font-hand text-lg sm:text-xl"
              style={{
                background: "var(--paper)",
                color: "var(--red)",
                padding: "8px 14px",
                borderRadius: 30,
                border: "3px solid var(--ink)",
                boxShadow: "4px 4px 0 var(--ink)",
              }}
            >
              cute mode ✦ on
            </div>
          </div>

          {/* floating label: NEW 2026 */}
          <div
            className="animate-float absolute hidden sm:block"
            style={{
              right: "-11%",
              bottom: "18%",
              animationDelay: "0.4s",
              ["--float-r" as string]: "-4deg",
              zIndex: 10,
            }}
          >
            <div
              className="font-mono-booth text-[11px]"
              style={{
                background: "var(--red)",
                color: "var(--paper)",
                padding: "6px 10px",
                borderRadius: 4,
                border: "2px solid var(--ink)",
                letterSpacing: "0.1em",
              }}
            >
              ★ NEW ✿ 2026
            </div>
          </div>

          {/* corner sparkles — always shown (intentional decoration around booth) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
            <Star5 x={-8}  y={-2}  size={36} color="var(--gold)" rotate={-15} />
            <Star5 x={108} y={-2}  size={28} color="var(--red)"  rotate={20}  />
            <Sparkle x={-4}  y={92} size={28} color="var(--red)" />
            <Sparkle x={104} y={50} size={22} color="var(--ink)" />
            <Heart   x={102} y={92} size={26} />
          </div>
        </div>

        {/* CTA */}
        {phase === "idle" ? (
          <button
            onClick={handleStart}
            className="font-display cursor-pointer transition-transform duration-200
              hover:-translate-y-0.5 active:translate-y-1
              text-xl sm:text-2xl px-6 sm:px-8 py-4 sm:py-5 rounded-xl"
            style={{
              position: "relative",
              zIndex: 20,
              border: "3px solid var(--ink)",
              background: "var(--red)",
              color: "var(--paper)",
              letterSpacing: "0.06em",
              boxShadow: "0 6px 0 var(--ink)",
            }}
          >
            ▸ START PHOTOSHOOT ◂
          </button>
        ) : (
          <p
            className="font-display text-2xl animate-twinkle"
            style={{ color: "var(--red)", letterSpacing: "0.1em", zIndex: 20, position: "relative" }}
          >
            ENTERING THE BOOTH…
          </p>
        )}
      </div>
    </div>
  );
}
