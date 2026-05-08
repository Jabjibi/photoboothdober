export function HeartSticker() {
  return (
    <div style={{ position: "absolute", left: "3%", top: "55%", transform: "rotate(-12deg)", zIndex: 2 }}>
      <svg style={{ width: 28, height: 28 }} viewBox="0 0 24 24" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6">
        <path d="M12 21s-7-4.5-9.5-9C.7 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.3 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
      </svg>
    </div>
  );
}
