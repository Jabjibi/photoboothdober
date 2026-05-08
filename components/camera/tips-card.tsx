export function TipsCard() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "var(--paper-2)", border: "3px dashed var(--ink)" }}
    >
      <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60 mb-2">TIPS</p>
      <ul className="text-sm leading-relaxed list-disc pl-4">
        <li>face the light — the booth is bright but the sparkle is brighter</li>
        <li>hold poses through the flash</li>
        <li>switch the filter mid-set — every shot can have its own vibe</li>
      </ul>
    </div>
  );
}
