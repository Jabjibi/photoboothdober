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
        border: "3px solid var(--ink)",
        borderRadius: 10,
        boxShadow: "0 5px 0 var(--ink)",
        padding: "6px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 5,
      }}
    >
      <MarqueeRow count={10} />
      <div
        className="font-display"
        style={{
          textAlign: "center",
          fontSize: "clamp(13px, 3.8vw, 22px)",
          lineHeight: 1,
          color: "var(--red)",
          WebkitTextStroke: "1px var(--ink)",
        }}
      >
        ✦ SPARKLE BOOTH ✦
      </div>
      <MarqueeRow count={10} />
    </div>
  );
}
