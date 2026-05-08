import { FRAME_STYLES } from "./types";
import { PhotoCell } from "./photo-cell";
import type { FrameProps } from "./types";

export function Strip4({ photos, styleId, meta }: FrameProps) {
  const s = FRAME_STYLES[styleId] ?? FRAME_STYLES.classic;
  const isNews = styleId === "news";
  const isFairy = styleId === "fairy";
  const isRetro = styleId === "retro";
  const title = meta.title ?? "PHOTOSTRIP";
  const date = meta.date ?? "SPARKLE BOOTH · 2026";

  return (
    <div
      style={{
        width: 220,
        background: s.palette.bg,
        padding: "16px 12px 14px",
        color: s.palette.ink,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        position: "relative",
        fontFamily: isNews ? "var(--font-pirata), serif" : "var(--font-space), sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: (isNews || isFairy) ? s.palette.ink : s.palette.paper,
          fontFamily: isNews ? "var(--font-pirata), serif" : "var(--font-bagel), sans-serif",
          fontSize: isNews ? 22 : 18,
          letterSpacing: "0.05em",
          lineHeight: 1,
          paddingBottom: 8,
          borderBottom: isNews ? `2px double ${s.palette.ink}` : "none",
        }}
      >
        {isNews ? "DAILY MOMENTS" : title}
      </div>
      {isFairy && (
        <div
          className="font-hand"
          style={{ textAlign: "center", color: s.palette.accent, fontSize: 16, marginTop: 2 }}
        >
          ✦ a sparkle a day ✦
        </div>
      )}
      {isNews && (
        <div
          className="font-mono-booth"
          style={{ textAlign: "center", fontSize: 8, marginTop: 3, letterSpacing: "0.2em" }}
        >
          VOL. 04 · SPECIAL EDITION
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: s.palette.paper,
              padding: isNews ? 4 : 0,
              border: isNews ? `1px solid ${s.palette.ink}` : "none",
            }}
          >
            <PhotoCell src={photos[i]} label={`0${i + 1}`} aspect={1.2} ink={s.palette.ink} />
          </div>
        ))}
      </div>
      <div
        className="font-mono-booth"
        style={{
          marginTop: 10,
          textAlign: "center",
          color: (isNews || isRetro || isFairy) ? s.palette.ink : s.palette.paper,
          fontSize: 9,
          letterSpacing: "0.18em",
          background: isRetro ? s.palette.accent : "transparent",
          padding: isRetro ? "4px 0" : 0,
          border: isRetro ? `2px solid ${s.palette.ink}` : "none",
        }}
      >
        {date}
      </div>
      {isFairy && (
        <>
          <div style={{ position: "absolute", top: -6, left: -6, transform: "rotate(-10deg)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={s.palette.accent}>
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
            </svg>
          </div>
          <div style={{ position: "absolute", top: 4, right: -4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c542" stroke={s.palette.ink} strokeWidth="1.4">
              <path d="M12 2 L14.6 9.2 L22 9.6 L16.2 14.2 L18.2 21.4 L12 17.2 L5.8 21.4 L7.8 14.2 L2 9.6 L9.4 9.2 Z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
