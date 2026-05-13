import type { LucideIcon } from "lucide-react";

interface DownloadButtonProps {
  icon: LucideIcon;
  title: string;
  sub: string;
  onClick: () => void;
}

export function DownloadButton({ icon: Icon, title, sub, onClick }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-transform hover:-translate-y-0.5"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        border: "2.5px solid var(--paper)",
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-lg"
        style={{
          width: 36,
          height: 36,
          background: "var(--red)",
          color: "var(--paper)",
          border: "2px solid var(--ink)",
        }}
      >
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm leading-none" style={{ color: "var(--ink)" }}>
          {title}
        </p>
        <p className="font-mono-booth mt-0.5 text-[9px] tracking-[0.15em] opacity-65">{sub}</p>
      </div>
      <span className="font-mono-booth text-sm" style={{ color: "var(--ink)" }}>
        ↓
      </span>
    </button>
  );
}
