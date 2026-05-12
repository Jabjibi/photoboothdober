import type { LayoutId, FrameMeta } from "@/lib/booth-context";
import { FrameField } from "./frame-field";
import w from "@/lib/wording.json";

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
          {w.frameSelect.meta.title}
        </p>
        <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60">
          {layoutId === "card1" ? w.frameSelect.meta.cardRequired : w.frameSelect.meta.cardOptional}
        </p>
      </div>

      {layoutId === "card1" ? (
        <>
          <FrameField
            label={w.frameSelect.meta.fields.name.label}
            value={meta.name ?? ""}
            onChange={updateMeta("name")}
            placeholder={w.frameSelect.meta.fields.name.placeholder}
          />
          <FrameField
            label={w.frameSelect.meta.fields.birthday.label}
            value={meta.birthday ?? ""}
            onChange={updateMeta("birthday")}
            placeholder={w.frameSelect.meta.fields.birthday.placeholder}
          />
          <FrameField
            label={w.frameSelect.meta.fields.titleCard.label}
            value={meta.title ?? ""}
            onChange={updateMeta("title")}
            placeholder={w.frameSelect.meta.fields.titleCard.placeholder}
          />
        </>
      ) : (
        <>
          <FrameField
            label={w.frameSelect.meta.fields.header.label}
            value={meta.title ?? ""}
            onChange={updateMeta("title")}
            placeholder={w.frameSelect.meta.fields.header.placeholder}
          />
          <FrameField
            label={w.frameSelect.meta.fields.date.label}
            value={meta.date ?? ""}
            onChange={updateMeta("date")}
            placeholder={w.frameSelect.meta.fields.date.placeholder}
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
        {w.frameSelect.meta.confirm}
      </button>
    </div>
  );
}
