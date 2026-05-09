import w from "@/lib/wording.json";

interface CameraHeaderProps {
  totalShots: number;
  onBack: () => void;
}

export function CameraHeader({ totalShots, onBack }: CameraHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="font-mono-booth text-[11px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
          {w.camera.header.step}
        </p>
        <h2
          className="font-display text-3xl leading-none sm:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          SMILE × {totalShots}
        </h2>
      </div>
      <button
        onClick={onBack}
        className="font-display shrink-0 cursor-pointer rounded-lg px-4 py-2.5 text-sm transition-transform hover:-translate-y-px"
        style={{
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          color: "var(--ink)",
          boxShadow: "0 4px 0 var(--ink)",
        }}
      >
        {w.camera.header.back}
      </button>
    </div>
  );
}
