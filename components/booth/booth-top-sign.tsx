import { MarqueeRow } from "@/components/shared/marquee-row";

export function BoothTopSign() {
  return (
    <div
      style={{
        position: "absolute",
        left: "4%",
        right: "4%",
        top: 0,
        height: "15.3%",
        background: "var(--paper)",
        border: "4px solid var(--ink)",
        borderRadius: 12,
        boxShadow: "0 6px 0 var(--ink)",
        padding: "8px 14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 5,
      }}
    >
      <MarqueeRow count={16} />
      <div
        className="font-display"
        style={{
          textAlign: "center",
          fontSize: "clamp(16px, 2.5vw, 32px)",
          lineHeight: 1,
          color: "var(--red)",
          WebkitTextStroke: "1.2px var(--ink)",
        }}
      >
        ✦ SPARKLE BOOTH ✦
      </div>
      <MarqueeRow count={16} />
    </div>
  );
}
