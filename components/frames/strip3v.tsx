import { FRAME_STYLES } from "./types";
import { PhotoCell } from "./photo-cell";
import type { FrameProps } from "./types";

export function Strip3V({ photos, styleId, meta }: FrameProps) {
  const s = FRAME_STYLES[styleId] ?? FRAME_STYLES.classic;
  const isNews = styleId === "news";
  const isFairy = styleId === "fairy";
  const title = meta.title ?? "STACK 3";


  return (
    <div
      style={{
        width: 220,
        background: s.palette.bg,
        padding: 12,
        color: s.palette.ink,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        position: "relative",
        fontFamily: "var(--font-space), sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: (isNews || isFairy) ? s.palette.ink : s.palette.paper,
          fontFamily: isNews ? "var(--font-pirata), serif" : "var(--font-bagel), sans-serif",
          fontSize: 22,
          paddingBottom: 6,
          borderBottom: isNews ? `2px double ${s.palette.ink}` : "none",
        }}
      >
        {title}
      </div>
      {isFairy && (
        <div
          className="font-hand"
          style={{ textAlign: "center", color: s.palette.accent, fontSize: 14, marginTop: 1 }}
        >
          ✦ moments x3 ✦
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ background: s.palette.paper, padding: isNews ? 4 : 0 }}>
            <PhotoCell src={photos[i]} label={`0${i + 1}`} aspect={1.3} ink={s.palette.ink} />
          </div>
        ))}
      </div>
      <div
        className="font-mono-booth"
        style={{
          marginTop: 10,
          textAlign: "center",
          color: (isNews || isFairy) ? s.palette.ink : s.palette.paper,
          fontSize: 9,
          letterSpacing: "0.2em",
        }}
      >
        SPARKLE BOOTH · 2026
      </div>
    </div>
  );
}
