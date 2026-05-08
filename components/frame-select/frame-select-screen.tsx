"use client";

import { useState } from "react";
import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { LAYOUTS, FRAME_STYLES } from "@/components/frames";
import { LayoutThumb } from "./layout-thumb";
import { FrameField } from "./frame-field";

// Approximate rendered frame dimensions (px) — used to compute preview zoom scale
// Heights from CSS aspect-ratio: cell height = width / aspect
// strip4: 4 × (196/1.2)=163px + gaps/padding; trip3h: (138/0.78)=177px + padding; etc.
const FRAME_DIMS: Record<LayoutId, { w: number; h: number }> = {
  strip4: { w: 220, h: 810 },
  trip3h: { w: 460, h: 295 },
  trip3v: { w: 220, h: 585 },
  card1:  { w: 360, h: 230 },
};

const LAYOUT_CARDS: { id: LayoutId; title: string; sub: string }[] = [
  { id: "strip4", title: "4 SHOT STRIP", sub: "classic vertical · 4 frames" },
  { id: "trip3h", title: "TRIPTYCH",     sub: "3 wide · landscape" },
  { id: "trip3v", title: "STACK 3",      sub: "3 tall · vertical" },
  { id: "card1",  title: "CREDENTIAL",   sub: "1 photo + name + dob" },
];

const STYLE_CARDS: { id: StyleId; swatch: string[] }[] = [
  { id: "classic", swatch: ["#161313", "#fbf6ee", "#d8201f"] },
  { id: "news",    swatch: ["#fbf6ee", "#161313", "#fbf6ee"] },
  { id: "fairy",   swatch: ["#ffe9ec", "#fff7f8", "#d8201f"] },
  { id: "retro",   swatch: ["#d8201f", "#fbf6ee", "#f5c542"] },
];

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

  const layout = LAYOUTS[layoutId];

  // Constrain width only — preview scrolls vertically so users can see the full frame
  const dims = FRAME_DIMS[layoutId];
  const previewScale = Math.min(400 / dims.w, 0.88);

  const updateMeta = (key: keyof FrameMeta) => (value: string) =>
    setMeta((m) => ({ ...m, [key]: value }));

  return (
    <div
      className="relative w-full h-full overflow-auto px-4 sm:px-6 pb-5 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: preview + layout chooser ─────────── */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono-booth text-[11px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
                STEP 02 · CHOOSE YOUR FRAME
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-none" style={{ color: "var(--ink)" }}>
                PICK A LAYOUT, PICK A VIBE.
              </h2>
              <p className="font-hand text-xl sm:text-2xl mt-1" style={{ color: "var(--red)" }}>
                the booth is warming up ✦
              </p>
            </div>
            <button
              onClick={onBack}
              className="font-display shrink-0 text-sm px-4 py-2.5 rounded-lg cursor-pointer
                transition-transform hover:-translate-y-px active:translate-y-0.5"
              style={{
                border: "2.5px solid var(--ink)",
                background: "var(--paper)",
                color: "var(--ink)",
                boxShadow: "0 4px 0 var(--ink)",
              }}
            >
              ← back
            </button>
          </div>

          {/* preview pane */}
          <div
            className="flex-1 relative overflow-auto flex items-start justify-center rounded-2xl min-h-[200px]"
            style={{
              background: "var(--paper-2)",
              border: "3px solid var(--ink)",
              boxShadow: "0 6px 0 var(--ink)",
              padding: 20,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.4px)",
                backgroundSize: "18px 18px",
                opacity: 0.15,
              }}
            />
            <p className="font-mono-booth absolute top-3 left-4 text-[10px] tracking-[0.2em] opacity-55">
              PREVIEW · {layout.name.toUpperCase()} · {FRAME_STYLES[styleId].name.toUpperCase()}
            </p>
            <p className="font-mono-booth absolute top-3 right-4 text-[10px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
              SHOTS NEEDED · {layout.shots}
            </p>
            {/* zoom constrains width; overflow-auto lets tall frames scroll */}
            <div style={{ zoom: previewScale, flexShrink: 0, position: "relative", zIndex: 10, marginTop: 32 }}>
              {layout.render([], styleId, meta)}
            </div>
          </div>

          {/* layout cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LAYOUT_CARDS.map((c) => {
              const active = layoutId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setLayoutId(c.id)}
                  className="text-left rounded-xl p-3 cursor-pointer transition-all duration-100"
                  style={{
                    background: active ? "var(--ink)" : "var(--paper)",
                    color: active ? "var(--paper)" : "var(--ink)",
                    border: "3px solid var(--ink)",
                    boxShadow: active ? "0 4px 0 var(--red)" : "0 4px 0 var(--ink)",
                  }}
                >
                  <LayoutThumb id={c.id} active={active} />
                  <p className="font-display text-[13px] mt-1.5 leading-none">{c.title}</p>
                  <p className="font-mono-booth text-[9px] opacity-70 mt-1 tracking-[0.12em]">
                    {c.sub.toUpperCase()}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: style + meta ──────────────────────── */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* style chooser */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            <p className="font-display text-base" style={{ color: "var(--red)" }}>FRAME STYLE</p>
            <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60 mb-3">
              FOUR LOOKS · PICK ONE
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {STYLE_CARDS.map((c) => {
                const active = styleId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setStyleId(c.id)}
                    className="text-left rounded-lg p-2 cursor-pointer"
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

          {/* meta inputs */}
          <div
            className="flex-1 flex flex-col gap-3 rounded-2xl p-4 min-h-0"
            style={{
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            <div>
              <p className="font-display text-base" style={{ color: "var(--red)" }}>CUSTOMIZE</p>
              <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60">
                {layoutId === "card1" ? "REQUIRED FOR LICENSE" : "OPTIONAL HEADER COPY"}
              </p>
            </div>

            {layoutId === "card1" ? (
              <>
                <FrameField label="NAME"     value={meta.name     ?? ""} onChange={updateMeta("name")}     placeholder="ANNA SPARKS" />
                <FrameField label="BIRTHDAY" value={meta.birthday ?? ""} onChange={updateMeta("birthday")} placeholder="07.26.2000" />
                <FrameField label="TITLE"    value={meta.title    ?? ""} onChange={updateMeta("title")}    placeholder="TEXTURE USER" />
              </>
            ) : (
              <>
                <FrameField label="HEADER" value={meta.title ?? ""} onChange={updateMeta("title")} placeholder="PHOTOSTRIP" />
                <FrameField label="DATE"   value={meta.date  ?? ""} onChange={updateMeta("date")}  placeholder="MAY 2026" />
              </>
            )}

            <div className="flex-1" />

            <button
              onClick={() => onConfirm({ layoutId, styleId, meta })}
              className="font-display w-full py-4 rounded-xl text-lg cursor-pointer
                transition-transform hover:-translate-y-px active:translate-y-0.5"
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
        </div>
      </div>
    </div>
  );
}
