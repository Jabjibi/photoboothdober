export function PrintSlot() {
  return (
    <div style={{ position: "absolute", left: "6.5%", top: "67%" }}>
      <div
        style={{
          width: 90,
          height: 56,
          background: "var(--ink)",
          border: "3px solid var(--ink)",
          borderRadius: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            top: "50%",
            height: 4,
            background: "var(--paper)",
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <div
        className="font-mono-booth"
        style={{
          fontSize: 10,
          color: "var(--paper)",
          background: "var(--ink)",
          padding: "2px 6px",
          display: "inline-block",
          marginTop: 4,
          letterSpacing: "0.1em",
        }}
      >
        ↓ PRINTS HERE
      </div>
    </div>
  );
}
