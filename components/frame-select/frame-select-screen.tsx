"use client";

import { useState } from "react";
import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { FrameSelectHeader } from "./frame-select-header";
import { FramePreviewPane } from "./frame-preview-pane";
import { LayoutPicker } from "./layout-picker";
import { StyleChooser } from "./style-chooser";
import { MetaInputs } from "./meta-inputs";

interface FrameSelectScreenProps {
  initialLayoutId?: LayoutId;
  initialStyleId?: StyleId;
  initialMeta?: FrameMeta;
  onConfirm: (cfg: { layoutId: LayoutId; styleId: StyleId; meta: FrameMeta }) => void;
  onBack: () => void;
}

export function FrameSelectScreen({
  initialLayoutId = "strip4",
  initialStyleId = "fairy",
  initialMeta = { name: "ANNA SPARKS", birthday: "07.26.2000", title: "TEXTURE USER" },
  onConfirm,
  onBack,
}: FrameSelectScreenProps) {
  const [layoutId, setLayoutId] = useState<LayoutId>(initialLayoutId);
  const [styleId, setStyleId] = useState<StyleId>(initialStyleId);
  const [meta, setMeta] = useState<FrameMeta>(initialMeta);

  const updateMeta = (key: keyof FrameMeta) => (value: string) =>
    setMeta((m) => ({ ...m, [key]: value }));

  return (
    <div
      className="relative h-full w-full overflow-auto px-4 pb-5 sm:px-6 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: preview + layout chooser ── */}
        <div className="flex min-h-0 flex-col gap-4">
          <FrameSelectHeader onBack={onBack} />
          <FramePreviewPane layoutId={layoutId} styleId={styleId} meta={meta} />
          <LayoutPicker layoutId={layoutId} onSelect={setLayoutId} />
        </div>

        {/* ── RIGHT: style + meta ── */}
        <div className="flex min-h-0 flex-col gap-4">
          <StyleChooser styleId={styleId} onSelect={setStyleId} />
          <MetaInputs
            layoutId={layoutId}
            meta={meta}
            updateMeta={updateMeta}
            onConfirm={() => onConfirm({ layoutId, styleId, meta })}
          />
        </div>
      </div>
    </div>
  );
}
