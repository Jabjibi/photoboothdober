interface DownloadButtonProps {
  icon: string;
  title: string;
  sub: string;
  onClick: () => void;
}

export function DownloadButton({ icon, title, sub, onClick }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left rounded-xl px-3 py-2.5 cursor-pointer
        transition-transform hover:-translate-y-0.5"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        border: "2.5px solid var(--paper)",
      }}
    >
      <div
        className="font-display flex items-center justify-center text-lg shrink-0 rounded-lg"
        style={{
          width: 36,
          height: 36,
          background: "var(--red)",
          color: "var(--paper)",
          border: "2px solid var(--ink)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm leading-none" style={{ color: "var(--ink)" }}>{title}</p>
        <p className="font-mono-booth text-[9px] tracking-[0.15em] opacity-65 mt-0.5">{sub}</p>
      </div>
      <span className="font-mono-booth text-sm" style={{ color: "var(--ink)" }}>↓</span>
    </button>
  );
}
