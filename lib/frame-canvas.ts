/**
 * Canvas-based frame renderer — avoids SVG foreignObject/CORS issues.
 * Photos are drawn directly via canvas drawImage; fonts are resolved from
 * CSS variables that next/font/google has already loaded.
 */

import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { FRAME_STYLES } from "@/components/frames";

const DPR = 2;

type Palette = { bg: string; paper: string; ink: string; accent: string };

/* ── helpers ──────────────────────────────────────────── */

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function fontFamily(cssVarName: string, fallback: string): string {
  const val = cssVar(cssVarName);
  return val ? `${val}, ${fallback}` : fallback;
}

function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = src;
  });
}

/** Cover-fit an image into a canvas region, then stroke a border. */
function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  x: number, y: number, w: number, h: number,
  label: string, ink: string,
) {
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    const ar = img.width / img.height;
    const boxAr = w / h;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (ar > boxAr) { sw = img.height * boxAr; sx = (img.width - sw) / 2; }
    else             { sh = img.width  / boxAr; sy = (img.height - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  } else {
    ctx.fillStyle = "#bdb3a3";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = ink;
    ctx.globalAlpha = 0.5;
    ctx.font = `${10 * DPR}px "DM Mono", monospace`;
    ctx.textAlign = "center";
    ctx.fillText(label, x + w / 2, y + h / 2 + 4 * DPR);
    ctx.globalAlpha = 1;
  }
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2 * DPR;
  ctx.strokeRect(x, y, w, h);
}

/* ── Strip4 (220 × dynamic) ───────────────────────────── */

async function renderStrip4(
  photos: string[], palette: Palette, styleId: StyleId, meta: FrameMeta,
): Promise<HTMLCanvasElement> {
  const isFairy = styleId === "fairy";
  const isNews  = styleId === "news";
  const isRetro = styleId === "retro";
  const title   = isNews ? "DAILY MOMENTS" : (meta.title ?? "PHOTOSTRIP");
  const date    = meta.date ?? "SPARKLE BOOTH · 2026";

  const W = 220, PX = 12, PT = 16, PB = 14, GAP = 8;
  const IW = W - PX * 2;                  // inner width = 196
  const CELL_H = Math.round(IW / 1.2);    // ≈ 163

  // measure height
  let H = PT + 22; // padding top + title line
  if (isFairy) H += 18 + 2;
  if (isNews)  H += 12 + 3 + 4; // vol + separator
  H += 10 + 4 * CELL_H + 3 * GAP + 10 + 14 + PB;

  const canvas = document.createElement("canvas");
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const bagel = fontFamily("--font-bagel", "sans-serif");
  const pirata = fontFamily("--font-pirata", "serif");
  const caveat = fontFamily("--font-caveat", "cursive");
  const mono   = fontFamily("--font-dm-mono", "monospace");

  let y = PT;

  // Title
  ctx.fillStyle = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.font = `${isNews ? 22 : 18}px ${isNews ? pirata : bagel}`;
  ctx.textAlign = "center";
  ctx.fillText(title, W / 2, y + 16);
  y += 22;

  if (isNews) {
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PX, y); ctx.lineTo(W - PX, y); ctx.stroke();
    y += 4;
    ctx.fillStyle = palette.ink;
    ctx.font = `8px ${mono}`;
    ctx.fillText("VOL. 04 · SPECIAL EDITION", W / 2, y + 10);
    y += 12 + 3;
  }
  if (isFairy) {
    ctx.fillStyle = palette.accent;
    ctx.font = `16px ${caveat}`;
    ctx.fillText("✦ a sparkle a day ✦", W / 2, y + 14);
    y += 18 + 2;
  }

  y += 10;

  const imgs = await Promise.all(photos.slice(0, 4).map((p) => (p ? loadImg(p) : Promise.resolve(null))));
  for (let i = 0; i < 4; i++) {
    const cy = y + i * (CELL_H + GAP);
    const pad = isNews ? 4 : 0;
    ctx.fillStyle = palette.paper;
    ctx.fillRect(PX - pad, cy - pad, IW + pad * 2, CELL_H + pad * 2);
    drawPhoto(ctx, imgs[i], PX, cy, IW, CELL_H, `PHOTO 0${i + 1}`, palette.ink);
  }
  y += 4 * CELL_H + 3 * GAP + 10;

  // Footer
  if (isRetro) {
    ctx.fillStyle = palette.accent;
    ctx.fillRect(PX, y, IW, 20);
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 2;
    ctx.strokeRect(PX, y, IW, 20);
    y += 2;
  }
  ctx.fillStyle = (isNews || isRetro || isFairy) ? palette.ink : palette.paper;
  ctx.font = `9px ${mono}`;
  ctx.textAlign = "center";
  ctx.fillText(date, W / 2, y + 11);

  return canvas;
}

/* ── Strip3H (460 × dynamic) ──────────────────────────── */

async function renderStrip3H(
  photos: string[], palette: Palette, styleId: StyleId, meta: FrameMeta,
): Promise<HTMLCanvasElement> {
  const isFairy = styleId === "fairy";
  const isNews  = styleId === "news";
  const title   = meta.title ?? "TRIPTYCH";

  const W = 460, PAD = 14, GAP = 8;
  const IW = W - PAD * 2;
  const CELL_W = Math.round((IW - GAP * 2) / 3);
  const CELL_H = Math.round(CELL_W / 0.78);
  const H = PAD + 32 + 10 + CELL_H + 10 + 14 + PAD;

  const canvas = document.createElement("canvas");
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const bagel  = fontFamily("--font-bagel",   "sans-serif");
  const pirata = fontFamily("--font-pirata",  "serif");
  const mono   = fontFamily("--font-dm-mono", "monospace");

  let y = PAD;

  // Header row
  const headerColor = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.fillStyle = headerColor;
  ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText("03 · TRIPTYCH", PAD, y + 12);
  ctx.textAlign = "right";
  ctx.fillText("SPARKLE", W - PAD, y + 12);
  ctx.font = `22px ${isNews ? pirata : bagel}`; ctx.textAlign = "center";
  ctx.fillText(title, W / 2, y + 22);
  y += 30;

  // Separator
  ctx.strokeStyle = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.lineWidth = isNews ? 2 : 1;
  if (!isNews) { ctx.setLineDash([4, 4]); }
  ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
  ctx.setLineDash([]);
  y += 10;

  const imgs = await Promise.all(photos.slice(0, 3).map((p) => (p ? loadImg(p) : Promise.resolve(null))));
  for (let i = 0; i < 3; i++) {
    const cx = PAD + i * (CELL_W + GAP);
    const pad = isNews ? 4 : 0;
    ctx.fillStyle = palette.paper;
    ctx.fillRect(cx - pad, y - pad, CELL_W + pad * 2, CELL_H + pad * 2);
    drawPhoto(ctx, imgs[i], cx, y, CELL_W, CELL_H, `PHOTO 0${i + 1}`, palette.ink);
  }
  y += CELL_H + 10;

  const fc = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.fillStyle = fc; ctx.font = `9px ${mono}`;
  ctx.textAlign = "left";  ctx.fillText("★ ONE WINK · ONE PRINT", PAD, y + 11);
  ctx.textAlign = "right"; ctx.fillText("SPARKLE BOOTH · 2026", W - PAD, y + 11);

  return canvas;
}

/* ── Strip3V (220 × dynamic) ──────────────────────────── */

async function renderStrip3V(
  photos: string[], palette: Palette, styleId: StyleId, meta: FrameMeta,
): Promise<HTMLCanvasElement> {
  const isFairy = styleId === "fairy";
  const isNews  = styleId === "news";
  const title   = meta.title ?? "STACK 3";

  const W = 220, PAD = 12, GAP = 8;
  const IW = W - PAD * 2;
  const CELL_H = Math.round(IW / 1.3);
  let H = PAD + 26 + 6; // padding + title + gap
  if (isFairy) H += 14 + 1;
  H += 10 + 3 * CELL_H + 2 * GAP + 10 + 14 + PAD;

  const canvas = document.createElement("canvas");
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const bagel  = fontFamily("--font-bagel",   "sans-serif");
  const pirata = fontFamily("--font-pirata",  "serif");
  const caveat = fontFamily("--font-caveat",  "cursive");
  const mono   = fontFamily("--font-dm-mono", "monospace");

  let y = PAD;

  ctx.fillStyle = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.font = `22px ${isNews ? pirata : bagel}`; ctx.textAlign = "center";
  ctx.fillText(title, W / 2, y + 20);
  y += 26 + 6;

  if (isFairy) {
    ctx.fillStyle = palette.accent;
    ctx.font = `14px ${caveat}`;
    ctx.fillText("✦ moments x3 ✦", W / 2, y + 12);
    y += 14 + 1;
  }
  y += 10;

  const imgs = await Promise.all(photos.slice(0, 3).map((p) => (p ? loadImg(p) : Promise.resolve(null))));
  for (let i = 0; i < 3; i++) {
    const cy = y + i * (CELL_H + GAP);
    const pad = isNews ? 4 : 0;
    ctx.fillStyle = palette.paper;
    ctx.fillRect(PAD - pad, cy - pad, IW + pad * 2, CELL_H + pad * 2);
    drawPhoto(ctx, imgs[i], PAD, cy, IW, CELL_H, `PHOTO 0${i + 1}`, palette.ink);
  }
  y += 3 * CELL_H + 2 * GAP + 10;

  ctx.fillStyle = (isNews || isFairy) ? palette.ink : palette.paper;
  ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("SPARKLE BOOTH · 2026", W / 2, y + 11);

  return canvas;
}

/* ── CardFrame (360 × 230) ────────────────────────────── */

async function renderCard(
  photos: string[], palette: Palette, meta: FrameMeta,
): Promise<HTMLCanvasElement> {
  const W = 360, H = 230, PAD = 14, GAP = 12, PHOTO_W = 120;
  const RX = PAD + PHOTO_W + GAP;
  const RW = W - RX - PAD;

  const canvas = document.createElement("canvas");
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);

  const bagel  = fontFamily("--font-bagel",   "sans-serif");
  const caveat = fontFamily("--font-caveat",  "cursive");
  const space  = fontFamily("--font-space",   "sans-serif");
  const mono   = fontFamily("--font-dm-mono", "monospace");

  // Background + border
  ctx.fillStyle = palette.paper;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = palette.ink; ctx.lineWidth = 3;
  if (ctx.roundRect) {
    ctx.beginPath(); ctx.roundRect(1.5, 1.5, W - 3, H - 3, 12); ctx.stroke();
  } else {
    ctx.strokeRect(1.5, 1.5, W - 3, H - 3);
  }

  // Photo
  const PHOTO_H = H - PAD * 2;
  const img = photos[0] ? await loadImg(photos[0]) : null;
  ctx.fillStyle = "#bdb3a3";
  ctx.fillRect(PAD, PAD, PHOTO_W, PHOTO_H);
  if (img) {
    ctx.save();
    ctx.beginPath(); ctx.rect(PAD, PAD, PHOTO_W, PHOTO_H); ctx.clip();
    const ar = img.width / img.height, boxAr = PHOTO_W / PHOTO_H;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (ar > boxAr) { sw = img.height * boxAr; sx = (img.width - sw) / 2; }
    else             { sh = img.width  / boxAr; sy = (img.height - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, PAD, PAD, PHOTO_W, PHOTO_H);
    ctx.restore();
  }
  ctx.strokeStyle = palette.ink; ctx.lineWidth = 2;
  ctx.strokeRect(PAD, PAD, PHOTO_W, PHOTO_H);

  // VERIFIED badge
  ctx.fillStyle = palette.accent;
  ctx.fillRect(PAD + 4, PAD + PHOTO_H - 20, 54, 16);
  ctx.fillStyle = palette.paper;
  ctx.font = `7px ${mono}`; ctx.textAlign = "left";
  ctx.fillText("VERIFIED", PAD + 7, PAD + PHOTO_H - 7);

  // Right column
  let ry = PAD;

  // Top row: SPARKLE / #0026
  ctx.strokeStyle = palette.ink; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(RX, ry + 20); ctx.lineTo(W - PAD, ry + 20); ctx.stroke();
  ctx.fillStyle = palette.accent;
  ctx.font = `16px ${bagel}`; ctx.textAlign = "left";
  ctx.fillText("SPARKLE", RX, ry + 14);
  ctx.fillStyle = palette.ink;
  ctx.font = `8px ${mono}`; ctx.textAlign = "right";
  ctx.fillText("# 0026", W - PAD, ry + 14);
  ry += 26;

  // CREATIVE LICENSE heading
  ctx.fillStyle = palette.ink;
  ctx.font = `22px ${bagel}`; ctx.textAlign = "left";
  ctx.fillText("CREATIVE", RX, ry + 18);
  ctx.fillText("LICENSE", RX, ry + 40);
  ry += 48;

  // Name (handwritten)
  ctx.fillStyle = palette.accent;
  ctx.font = `20px ${caveat}`;
  ctx.fillText(meta.name ?? "your name", RX, ry + 16);
  ry += 24;

  // Detail grid (2×2)
  const fields = [
    { label: "NAME",  value: meta.name     ?? "—" },
    { label: "DOB",   value: meta.birthday ?? "—" },
    { label: "VALID", value: "DOES NOT EXPIRE"     },
    { label: "TITLE", value: meta.title    ?? "TEXTURE USER" },
  ];
  const colW = RW / 2;
  ctx.font = `8px ${mono}`; ctx.textAlign = "left";
  fields.forEach((f, i) => {
    const fx = RX + (i % 2) * colW;
    const fy = ry + Math.floor(i / 2) * 28;
    ctx.fillStyle = palette.ink; ctx.globalAlpha = 0.6;
    ctx.fillText(f.label, fx, fy + 8);
    ctx.globalAlpha = 1;
    ctx.font = `500 10px ${space}`;
    ctx.fillStyle = palette.ink;
    ctx.fillText(f.value.slice(0, 14), fx, fy + 20);
    ctx.font = `8px ${mono}`;
  });

  return canvas;
}

/* ── Public API ───────────────────────────────────────── */

export async function exportFrameToPng(
  layoutId: LayoutId,
  styleId: StyleId,
  meta: FrameMeta,
  photos: string[],
): Promise<string> {
  // Wait for all CSS fonts to be available in canvas
  await document.fonts.ready;

  const s = FRAME_STYLES[styleId];
  let canvas: HTMLCanvasElement;

  switch (layoutId) {
    case "strip4":
      canvas = await renderStrip4(photos, s.palette, styleId, meta); break;
    case "trip3h":
      canvas = await renderStrip3H(photos, s.palette, styleId, meta); break;
    case "trip3v":
      canvas = await renderStrip3V(photos, s.palette, styleId, meta); break;
    case "card1":
      canvas = await renderCard(photos, s.palette, meta); break;
    default:
      canvas = await renderStrip4(photos, s.palette, styleId, meta);
  }

  return canvas.toDataURL("image/png");
}
