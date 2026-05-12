"use client";

import w from "@/lib/wording.json";

interface ResultHeaderProps {
  onRetake: () => void;
}

export function ResultHeader({ onRetake }: ResultHeaderProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <div>
        <p
          className="font-mono-booth text-[11px] tracking-[0.2em]"
          style={{ color: "var(--red)" }}
        >
          {w.result.header.step}
        </p>
        <h2
          className="font-display text-2xl leading-none sm:text-3xl"
          style={{ color: "var(--ink)" }}
        >
          {w.result.header.title}
        </h2>
      </div>
      <button
        onClick={onRetake}
        className="font-display shrink-0 cursor-pointer rounded-lg px-4 py-2.5 text-sm transition-transform hover:-translate-y-px"
        style={{
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          color: "var(--ink)",
          boxShadow: "0 4px 0 var(--ink)",
        }}
      >
        {w.result.header.retake}
      </button>
    </div>
  );
}
