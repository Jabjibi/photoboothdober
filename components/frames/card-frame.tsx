import { FRAME_STYLES } from "./types";
import type { FrameProps } from "./types";

export function CardFrame({ photos, styleId, meta }: FrameProps) {
  const s = FRAME_STYLES[styleId] ?? FRAME_STYLES.classic;

  return (
    <div
      style={{
        width: 360,
        height: 230,
        background: s.palette.paper,
        border: `3px solid ${s.palette.ink}`,
        borderRadius: 12,
        padding: 14,
        color: s.palette.ink,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        fontFamily: "var(--font-space), sans-serif",
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 12,
        position: "relative",
      }}
    >
      {/* photo */}
      <div
        style={{
          background: "#bdb3a3",
          border: `2px solid ${s.palette.ink}`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[0]}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              opacity: 0.55,
              letterSpacing: "0.15em",
            }}
          >
            PORTRAIT
          </div>
        )}
        <div
          className="font-mono-booth"
          style={{
            position: "absolute",
            bottom: 4,
            left: 4,
            background: s.palette.accent,
            color: s.palette.paper,
            fontSize: 8,
            padding: "2px 4px",
            letterSpacing: "0.1em",
          }}
        >
          VERIFIED
        </div>
      </div>

      {/* details */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: `1px solid ${s.palette.ink}`,
              paddingBottom: 4,
            }}
          >
            <span className="font-display" style={{ fontSize: 16, color: s.palette.accent }}>
              SPARKLE
            </span>
            <span className="font-mono-booth" style={{ fontSize: 8, letterSpacing: "0.15em" }}>
              # 0026
            </span>
          </div>
          <div className="font-display" style={{ fontSize: 22, lineHeight: 1.05, marginTop: 6 }}>
            CREATIVE
            <br />
            LICENSE
          </div>
          <div
            className="font-hand"
            style={{ fontSize: 22, color: s.palette.accent, marginTop: 2, lineHeight: 1 }}
          >
            {meta.name || "your name"}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 9 }}>
          {[
            { label: "NAME", value: meta.name || "—" },
            { label: "DOB", value: meta.birthday || "—" },
            { label: "VALID", value: "DOES NOT EXPIRE" },
            { label: "TITLE", value: meta.title || "TEXTURE USER" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono-booth" style={{ opacity: 0.6, letterSpacing: "0.1em" }}>
                {label}
              </div>
              <div style={{ fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* paperclip */}
      <div
        style={{
          position: "absolute",
          top: -10,
          left: 24,
          width: 14,
          height: 30,
          borderTop: `2px solid ${s.palette.ink}`,
          borderLeft: `2px solid ${s.palette.ink}`,
          borderRight: `2px solid ${s.palette.ink}`,
          borderBottom: "none",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
        }}
      />
      {/* corner stars */}
      <div style={{ position: "absolute", top: 8, right: 10, display: "flex", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={s.palette.accent}>
            <path d="M12 2 L14.6 9.2 L22 9.6 L16.2 14.2 L18.2 21.4 L12 17.2 L5.8 21.4 L7.8 14.2 L2 9.6 L9.4 9.2 Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
