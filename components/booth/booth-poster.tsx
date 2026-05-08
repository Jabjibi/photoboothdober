export function BoothPoster() {
  return (
    <div
      style={{
        position: "absolute",
        left: "3.9%",
        top: "3.6%",
        width: "32.6%",
        height: "48.8%",
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        borderRadius: 10,
        boxShadow: "4px 4px 0 var(--ink)",
        transform: "rotate(-3deg)",
        padding: "10px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div className="font-hand" style={{ fontSize: 18, color: "var(--ink)" }}>
        say cheese!
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1].map((s) => (
          <div
            key={s}
            style={{
              width: 36,
              height: 110,
              background: "var(--ink)",
              border: "2px solid var(--ink)",
              padding: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{ flex: 1, background: i % 2 === 0 ? "var(--red-soft)" : "var(--paper-2)" }}
              />
            ))}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 100 60" style={{ width: 90, height: 54, marginTop: 2 }}>
        <path
          d="M50 2 L57 12 L70 6 L68 19 L82 22 L72 32 L84 42 L70 44 L72 58 L58 50 L50 60 L42 50 L28 58 L30 44 L16 42 L28 32 L18 22 L32 19 L30 6 L43 12 Z"
          fill="var(--red)"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="36"
          textAnchor="middle"
          fontFamily="var(--font-bagel), sans-serif"
          fontSize="18"
          fill="var(--paper)"
        >
          FREE!
        </text>
      </svg>

      <div
        className="font-display"
        style={{ fontSize: 14, letterSpacing: "0.15em", color: "var(--ink)" }}
      >
        PHOTOS
      </div>
    </div>
  );
}
