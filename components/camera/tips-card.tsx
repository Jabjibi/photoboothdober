export function TipsCard() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "var(--paper-2)", border: "3px dashed var(--ink)" }}
    >
      <p className="font-mono-booth mb-2 text-[9px] tracking-[0.18em] opacity-60">TIPS</p>
      <ul className="list-disc pl-4 text-sm leading-relaxed">
        <li>face the light — the booth is bright but the sparkle is brighter</li>
        <li>hold poses through the flash</li>
        <li>switch the filter mid-set — every shot can have its own vibe</li>
      </ul>
    </div>
  );
}
