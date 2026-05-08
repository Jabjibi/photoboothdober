import { Star5 } from "@/components/shared/star5";
import { Sparkle } from "@/components/shared/sparkle";
import { BoothTopSign } from "./booth-top-sign";
import { BoothPoster } from "./booth-poster";
import { HeartSticker } from "./heart-sticker";
import { PrintSlot } from "./print-slot";
import { SmileySticker } from "./smiley-sticker";
import { BoothCurtainArea } from "./booth-curtain-area";

interface BoothCanvasProps {
  curtainOpen?: boolean;
}

export function BoothCanvas({ curtainOpen = false }: BoothCanvasProps) {
  return (
    <div
      className="relative"
      style={{ width: "clamp(280px, 46vw, 460px)", aspectRatio: "460/600" }}
    >
      {/* drop shadow */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: -16,
          height: 26,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35), transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <BoothTopSign />

      {/* sign legs */}
      <div
        style={{
          position: "absolute",
          left: "12%",
          top: "14.7%",
          width: 6,
          height: "2.3%",
          background: "var(--ink)",
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          top: "14.7%",
          width: 6,
          height: "2.3%",
          background: "var(--ink)",
          zIndex: 4,
        }}
      />

      {/* BOOTH BODY */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "16.7%",
          bottom: "4%",
          background: "var(--red)",
          border: "5px solid var(--ink)",
          borderRadius: 14,
          boxShadow: "inset 0 -30px 0 var(--red-deep), 0 8px 0 var(--ink)",
          overflow: "hidden",
        }}
      >
        {/* diagonal stripe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 22px)",
            pointerEvents: "none",
          }}
        />

        <BoothPoster />
        <HeartSticker />
        <PrintSlot />
        <SmileySticker />
        <BoothCurtainArea curtainOpen={curtainOpen} />

        {/* base step */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "3.7%",
            background: "var(--ink)",
          }}
        />

        {/* mini stickers */}
        <Star5 x={42} y={8} size={20} color="var(--gold)" rotate={-8} delay={0.2} />
        <Sparkle x={38} y={50} size={16} color="var(--paper)" delay={0.4} />
        <Star5 x={94} y={84} size={16} color="var(--gold)" rotate={20} delay={0.8} />
      </div>
    </div>
  );
}
