import type { LayoutId } from "@/lib/booth-context";
import { LayoutThumb } from "./layout-thumb";
import w from "@/lib/wording.json";

const LAYOUT_CARDS = w.frameSelect.layouts as { id: LayoutId; title: string; sub: string }[];

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
