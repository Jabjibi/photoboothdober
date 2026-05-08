export function CurtainPelmet() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        background: "repeating-linear-gradient(90deg, var(--red) 0 16px, var(--paper) 16px 32px)",
        borderBottom: "3px solid var(--ink)",
        zIndex: 6,
      }}
    />
  );
}
