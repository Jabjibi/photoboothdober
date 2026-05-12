import w from "@/lib/wording.json";

interface PrinterMouthProps {
  printing: boolean;
}

export function PrinterMouth({ printing }: PrinterMouthProps) {
  return (
    <div
      className="font-mono-booth absolute top-0 right-0 left-0 z-[5] flex items-center justify-between px-4 text-[9px] tracking-[0.12em] sm:text-[11px] sm:tracking-[0.2em]"
      style={{
        height: 60,
        background: "var(--ink)",
        borderBottom: "3px solid var(--ink)",
        color: "var(--paper)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{
            background: printing ? "var(--red)" : "var(--gold)",
            animation: printing ? "twinkle 0.6s infinite ease-in-out" : "none",
          }}
        />
        <span className="whitespace-nowrap">
          {printing ? w.result.printer.printing : w.result.printer.done}
        </span>
      </div>
      <span className="whitespace-nowrap opacity-55">{w.result.printer.version}</span>
    </div>
  );
}
