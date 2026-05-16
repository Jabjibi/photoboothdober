import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { LAYOUTS, FRAME_STYLES } from "@/components/frames";

const FRAME_DIMS: Record<LayoutId, { w: number; h: number }> = {
  strip4: { w: 220, h: 810 },
  trip3h: { w: 460, h: 295 },
  trip3v: { w: 220, h: 585 },
  card1: { w: 360, h: 230 },
};

interface FramePreviewPaneProps {
  layoutId: LayoutId;
  styleId: StyleId;
  meta: FrameMeta;
}

export function FramePreviewPane({ layoutId, styleId, meta }: FramePreviewPaneProps) {
  const layout = LAYOUTS[layoutId];
  const dims = FRAME_DIMS[layoutId];
  const previewScale = Math.min(400 / dims.w, 0.88);

  return (
    <div
      className="relative flex min-h-[200px] flex-1 items-start justify-center overflow-auto rounded-2xl"
      style={{
        backgroundColor: "var(--paper-2)",
        backgroundImage:
          "radial-gradient(color-mix(in srgb, var(--ink) 15%, transparent) 1px, transparent 1.4px)",
        backgroundSize: "18px 18px",
        border: "3px solid var(--ink)",
        boxShadow: "0 6px 0 var(--ink)",
        padding: 20,
      }}
    >
      <div className="absolute top-3 right-4 left-4 flex items-center justify-between gap-2">
        <p className="font-mono-booth min-w-0 truncate text-[10px] tracking-[0.2em] opacity-55">
          PREVIEW · {layout.name.toUpperCase()} · {FRAME_STYLES[styleId].name.toUpperCase()}
        </p>
        <p
          className="font-mono-booth shrink-0 text-[10px] tracking-[0.2em]"
          style={{ color: "var(--red)" }}
        >
          SHOTS NEEDED · {layout.shots}
        </p>
      </div>
      <div
        style={{
          zoom: previewScale,
          flexShrink: 0,
          position: "relative",
          zIndex: 10,
          marginTop: 32,
        }}
      >
        {layout.render([], styleId, meta)}
      </div>
    </div>
  );
}
