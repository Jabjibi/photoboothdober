import w from "@/lib/wording.json";

interface FrameSelectHeaderProps {
  onBack: () => void;
}

export function FrameSelectHeader({ onBack }: FrameSelectHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="font-mono-booth text-[11px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
          {w.frameSelect.header.step}
        </p>
        <h2
          className="font-display text-3xl leading-none sm:text-4xl"
          style={{ color: "var(--ink)" }}
        >
          {w.frameSelect.header.title}
        </h2>
        <p className="font-hand mt-1 text-xl sm:text-2xl" style={{ color: "var(--red)" }}>
          {w.frameSelect.header.subtitle}
        </p>
      </div>
      <button
        onClick={onBack}
        className="font-display shrink-0 cursor-pointer rounded-lg px-4 py-2.5 text-sm transition-transform hover:-translate-y-px active:translate-y-0.5"
        style={{
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          color: "var(--ink)",
          boxShadow: "0 4px 0 var(--ink)",
        }}
      >
        {w.frameSelect.header.back}
      </button>
    </div>
  );
}
