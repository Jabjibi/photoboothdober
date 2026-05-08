interface CameraHeaderProps {
  totalShots: number;
  onBack: () => void;
}

export function CameraHeader({ totalShots, onBack }: CameraHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <p className="font-mono-booth text-[11px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
          STEP 03 · INSIDE THE BOOTH
        </p>
        <h2 className="font-display text-3xl sm:text-4xl leading-none" style={{ color: "var(--ink)" }}>
          SMILE × {totalShots}
        </h2>
      </div>
      <button
        onClick={onBack}
        className="font-display shrink-0 text-sm px-4 py-2.5 rounded-lg cursor-pointer transition-transform hover:-translate-y-px"
        style={{
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          color: "var(--ink)",
          boxShadow: "0 4px 0 var(--ink)",
        }}
      >
        ← change frame
      </button>
    </div>
  );
}
