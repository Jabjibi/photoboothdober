export function SmileySticker() {
  return (
    <div
      style={{
        position: "absolute",
        left: "3.9%",
        bottom: "6%",
        transform: "rotate(-6deg)",
        zIndex: 2,
      }}
    >
      <svg style={{ width: 40, height: 40 }} viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" fill="var(--gold)" stroke="var(--ink)" strokeWidth="2.5" />
        <circle cx="20" cy="24" r="2.2" fill="var(--ink)" />
        <circle cx="36" cy="24" r="2.2" fill="var(--ink)" />
        <path
          d="M18 32 Q28 42 38 32"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
