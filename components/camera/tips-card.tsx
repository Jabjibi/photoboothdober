import w from "@/lib/wording.json";

export function TipsCard() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "var(--paper-2)", border: "3px dashed var(--ink)" }}
    >
      <p className="font-mono-booth mb-2 text-[9px] tracking-[0.18em] opacity-60">{w.camera.tips.title}</p>
      <ul className="list-disc pl-4 text-sm leading-relaxed">
        {w.camera.tips.items.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
}
