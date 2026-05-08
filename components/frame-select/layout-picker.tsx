import type { LayoutId } from "@/lib/booth-context";
import { LayoutThumb } from "./layout-thumb";

const LAYOUT_CARDS: { id: LayoutId; title: string; sub: string }[] = [
  { id: "strip4", title: "4 SHOT STRIP", sub: "classic vertical · 4 frames" },
  { id: "trip3h", title: "TRIPTYCH", sub: "3 wide · landscape" },
  { id: "trip3v", title: "STACK 3", sub: "3 tall · vertical" },
  { id: "card1", title: "CREDENTIAL", sub: "1 photo + name + dob" },
];

interface LayoutPickerProps {
  layoutId: LayoutId;
  onSelect: (id: LayoutId) => void;
}

export function LayoutPicker({ layoutId, onSelect }: LayoutPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {LAYOUT_CARDS.map((c) => {
        const active = layoutId === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="cursor-pointer rounded-xl p-3 text-left transition-all duration-100"
            style={{
              background: active ? "var(--ink)" : "var(--paper)",
              color: active ? "var(--paper)" : "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: active ? "0 4px 0 var(--red)" : "0 4px 0 var(--ink)",
            }}
          >
            <LayoutThumb id={c.id} active={active} />
            <p className="font-display mt-1.5 text-[13px] leading-none">{c.title}</p>
            <p className="font-mono-booth mt-1 text-[9px] tracking-[0.12em] opacity-70">
              {c.sub.toUpperCase()}
            </p>
          </button>
        );
      })}
    </div>
  );
}
