import type { StyleId } from "@/lib/booth-context";
import { FRAME_STYLES } from "@/components/frames";
import w from "@/lib/wording.json";

const STYLE_CARDS: { id: StyleId; swatch: string[] }[] = [
  { id: "classic", swatch: ["#161313", "#fbf6ee", "#d8201f"] },
  { id: "news", swatch: ["#fbf6ee", "#161313", "#fbf6ee"] },
  { id: "fairy", swatch: ["#ffe9ec", "#fff7f8", "#d8201f"] },
  { id: "retro", swatch: ["#d8201f", "#fbf6ee", "#f5c542"] },
];

interface StyleChooserProps {
  styleId: StyleId;
  onSelect: (id: StyleId) => void;
}

export function StyleChooser({ styleId, onSelect }: StyleChooserProps) {
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
        {w.frameSelect.style.title}
      </p>
      <p className="font-mono-booth mb-3 text-[9px] tracking-[0.18em] opacity-60">
        {w.frameSelect.style.subtitle}
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {STYLE_CARDS.map((c) => {
          const active = styleId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="cursor-pointer rounded-lg p-2 text-left"
              style={{
                background: active ? "var(--ink)" : "var(--paper-2)",
                color: active ? "var(--paper)" : "var(--ink)",
                border: "2.5px solid var(--ink)",
                boxShadow: active ? "0 3px 0 var(--red)" : "0 3px 0 var(--ink)",
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                {c.swatch.map((s, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, height: 24, background: s, border: "1px solid var(--ink)" }}
                  />
                ))}
              </div>
              <p className="font-display text-[13px] leading-none">
                {FRAME_STYLES[c.id].name.toUpperCase()}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
