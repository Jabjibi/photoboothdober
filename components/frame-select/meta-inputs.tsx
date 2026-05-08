import type { LayoutId, FrameMeta } from "@/lib/booth-context";
import { FrameField } from "./frame-field";

interface MetaInputsProps {
  layoutId: LayoutId;
  meta: FrameMeta;
  updateMeta: (key: keyof FrameMeta) => (value: string) => void;
  onConfirm: () => void;
}

export function MetaInputs({ layoutId, meta, updateMeta, onConfirm }: MetaInputsProps) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-3 rounded-2xl p-4"
      style={{
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--ink)",
      }}
    >
      <div>
        <p className="font-display text-base" style={{ color: "var(--red)" }}>
          CUSTOMIZE
        </p>
        <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60">
          {layoutId === "card1" ? "REQUIRED FOR LICENSE" : "OPTIONAL HEADER COPY"}
        </p>
      </div>

      {layoutId === "card1" ? (
        <>
          <FrameField
            label="NAME"
            value={meta.name ?? ""}
            onChange={updateMeta("name")}
            placeholder="ANNA SPARKS"
          />
          <FrameField
            label="BIRTHDAY"
            value={meta.birthday ?? ""}
            onChange={updateMeta("birthday")}
            placeholder="07.26.2000"
          />
          <FrameField
            label="TITLE"
            value={meta.title ?? ""}
            onChange={updateMeta("title")}
            placeholder="TEXTURE USER"
          />
        </>
      ) : (
        <>
          <FrameField
            label="HEADER"
            value={meta.title ?? ""}
            onChange={updateMeta("title")}
            placeholder="PHOTOSTRIP"
          />
          <FrameField
            label="DATE"
            value={meta.date ?? ""}
            onChange={updateMeta("date")}
            placeholder="MAY 2026"
          />
        </>
      )}

      <div className="flex-1" />

      <button
        onClick={onConfirm}
        className="font-display w-full cursor-pointer rounded-xl py-4 text-lg transition-transform hover:-translate-y-px active:translate-y-0.5"
        style={{
          background: "var(--red)",
          color: "var(--paper)",
          border: "3px solid var(--ink)",
          letterSpacing: "0.06em",
          boxShadow: "0 6px 0 var(--ink)",
        }}
      >
        ▸ ENTER THE BOOTH ✦
      </button>
    </div>
  );
}
