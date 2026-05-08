export function CurtainRod() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "calc(12% - 4px)",
        height: 5,
        background: "var(--ink)",
        zIndex: 7,
      }}
    />
  );
}
