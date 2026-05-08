import { FRAME_STYLES } from "./types";
import { PhotoCell } from "./photo-cell";
import type { FrameProps } from "./types";

export function Strip3H({ photos, styleId, meta }: FrameProps) {
  const s = FRAME_STYLES[styleId] ?? FRAME_STYLES.classic;
  const isNews = styleId === "news";
  const isFairy = styleId === "fairy";
  const title = meta.title ?? "TRIPTYCH";

  return (
    <div
      style={{
        width: 460,
        background: s.palette.bg,
        padding: 14,
        color: s.palette.ink,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        fontFamily: "var(--font-space), sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          color: (isNews || isFairy) ? s.palette.ink : s.palette.paper,
          paddingBottom: 8,
          borderBottom: isNews ? `2px double ${s.palette.ink}` : isFairy ? `1px dashed ${s.palette.ink}` : `1px dashed ${s.palette.paper}`,
          marginBottom: 10,
        }}
      >
        <span className="font-mono-booth" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
          03 · TRIPTYCH
        </span>
        <span
          style={{
            fontFamily: isNews ? "var(--font-pirata), serif" : "var(--font-bagel), sans-serif",
            fontSize: 22,
          }}
        >
          {title}
        </span>
        <span className="font-mono-booth" style={{ fontSize: 10, letterSpacing: "0.18em" }}>
          SPARKLE
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ background: s.palette.paper, padding: isNews ? 4 : 0 }}>
            <PhotoCell src={photos[i]} label={`0${i + 1}`} aspect={0.78} ink={s.palette.ink} />
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          color: (isNews || isFairy) ? s.palette.ink : s.palette.paper,
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
        }}
      >
        <span>★ ONE WINK · ONE PRINT</span>
        <span>SPARKLE BOOTH · 2026</span>
      </div>
    </div>
  );
}
