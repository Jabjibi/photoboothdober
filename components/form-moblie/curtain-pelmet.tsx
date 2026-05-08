export function CurtainPelmet() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "12%",
        minHeight: 22,
        background: "repeating-linear-gradient(90deg, var(--red) 0 14px, var(--paper) 14px 28px)",
        borderBottom: "2px solid var(--ink)",
        zIndex: 6,
      }}
    />
  );
}
