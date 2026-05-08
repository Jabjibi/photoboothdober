export function PrintSlot() {
  return (
    <div style={{ position: "absolute", left: "6.5%", top: "67%" }}>
      <div
        style={{
          width: "28%",
          minWidth: 70,
          aspectRatio: "90/50",
          background: "var(--ink)",
          border: "2px solid var(--ink)",
          borderRadius: 5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            top: "50%",
            height: 3,
            background: "var(--paper)",
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <div
        className="font-mono-booth"
        style={{
          fontSize: "clamp(7px, 1.8vw, 10px)",
          color: "var(--paper)",
          background: "var(--ink)",
          padding: "1px 5px",
          display: "inline-block",
          marginTop: 3,
          letterSpacing: "0.08em",
        }}
      >
        ↓ PRINTS HERE
      </div>
    </div>
  );
}
