import w from "@/lib/wording.json";

interface ReceiptCardProps {
  layoutName: string;
  styleName: string;
  photoCount: number;
  now: Date;
}

export function ReceiptCard({ layoutName, styleName, photoCount, now }: ReceiptCardProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--ink)",
      }}
    >
      <p className="font-display text-base" style={{ color: "var(--red)" }}>
        {w.result.receipt.title}
      </p>
      <pre
        className="font-mono-booth mt-2 text-[11px] leading-[1.7]"
        style={{ color: "var(--ink)" }}
      >
        {`────────────────────
LAYOUT   ${layoutName.toUpperCase()}
STYLE    ${styleName.toUpperCase()}
SHOTS    ${photoCount}
DATE     ${now.toLocaleDateString("en-GB").toUpperCase()}
TIME     ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
────────────────────
TOTAL    FREE ✦`}
      </pre>
    </div>
  );
}
