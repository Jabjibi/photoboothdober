"use client";

import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { LAYOUTS, FRAME_STYLES } from "@/components/frames";
import { exportFrameToPng } from "@/lib/frame-canvas";
import { ResultHeader } from "./result-header";
import { PrinterBox } from "./printer-box";
import { DownloadsCard } from "./downloads-card";
import { ReceiptCard } from "./receipt-card";
import w from "@/lib/wording.json";

function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

interface ResultScreenProps {
  photos: string[];
  layoutId: LayoutId;
  styleId: StyleId;
  meta: FrameMeta;
  onRestart: () => void;
  onRetake: () => void;
}

export function ResultScreen({
  photos,
  layoutId,
  styleId,
  meta,
  onRestart,
  onRetake,
}: ResultScreenProps) {
  const layout = LAYOUTS[layoutId];
  const frameStyle = FRAME_STYLES[styleId];
  const now = new Date();

  const downloadStrip = async () => {
    try {
      const data = await exportFrameToPng(layoutId, styleId, meta, photos);
      downloadDataUrl(data, "sparkle-booth-strip.png");
    } catch (err) {
      console.error("Strip export failed:", err);
      alert(w.result.errors.strip);
    }
  };

  const downloadPhotos = () => {
    photos.forEach((p, i) => {
      if (p) downloadDataUrl(p, `sparkle-booth-${String(i + 1).padStart(2, "0")}.jpg`);
    });
  };

  const downloadVideo = async () => {
    if (!photos.length) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext("2d")!;
      const stream = canvas.captureStream(8);
      const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
      const chunks: BlobPart[] = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        downloadDataUrl(URL.createObjectURL(blob), "sparkle-booth.webm");
      };
      rec.start();
      const imgs = await Promise.all(
        photos.map(
          (p) =>
            new Promise<HTMLImageElement>((res) => {
              const img = new Image();
              img.onload = () => res(img);
              img.src = p;
            })
        )
      );
      for (let cycle = 0; cycle < 2; cycle++) {
        for (const img of imgs) {
          ctx.fillStyle = "#161313";
          ctx.fillRect(0, 0, 600, 800);
          const scale = Math.min(600 / img.width, 800 / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          ctx.drawImage(img, (600 - dw) / 2, (800 - dh) / 2, dw, dh);
          ctx.strokeStyle = "#d8201f";
          ctx.lineWidth = 16;
          ctx.strokeRect(8, 8, 584, 784);
          await new Promise<void>((r) => setTimeout(r, 320));
        }
      }
      rec.stop();
    } catch {
      alert(w.result.errors.video);
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-auto px-5 pb-5 sm:px-6 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: printer ── */}
        <div className="flex min-h-0 flex-col gap-4">
          <ResultHeader onRetake={onRetake} />
          <PrinterBox photos={photos} layoutId={layoutId} styleId={styleId} meta={meta} />
        </div>

        {/* ── RIGHT: downloads + receipt ── */}
        <div className="flex flex-col gap-4">
          <DownloadsCard
            photoCount={photos.filter(Boolean).length}
            onDownloadStrip={downloadStrip}
            onDownloadPhotos={downloadPhotos}
            onDownloadVideo={downloadVideo}
          />
          <ReceiptCard
            layoutName={layout.name}
            styleName={frameStyle.name}
            photoCount={photos.length}
            now={now}
          />
          <button
            onClick={onRestart}
            className="font-display w-full cursor-pointer rounded-xl py-4 text-xl tracking-[0.06em] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
            style={{
              background: "var(--red)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "0 6px 0 var(--ink)",
            }}
          >
            {w.result.anotherRound}
          </button>
        </div>
      </div>
    </div>
  );
}
