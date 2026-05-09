"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { LAYOUTS, FRAME_STYLES } from "@/components/frames";
import { exportFrameToPng } from "@/lib/frame-canvas";
import { DownloadButton } from "./download-button";
import w from "@/lib/wording.json";
import { Sparkle } from "@/components/shared/sparkle";
import { Star5 } from "@/components/shared/star5";

/* ── helpers ────────────────────────────────────── */
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ── component ──────────────────────────────────── */
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

  const [printing, setPrinting] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);

  /* GSAP print drop */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stripRef.current) return;
      gsap.fromTo(
        stripRef.current,
        { y: -700 },
        {
          y: 0,
          duration: 1.6,
          delay: 0.25,
          ease: "power3.out",
          onComplete: () => setPrinting(false),
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* swing when revealed */
  useEffect(() => {
    if (printing || !stripWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(stripWrapRef.current, {
        rotation: 1.2,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "top center",
      });
    });
    return () => ctx.revert();
  }, [printing]);

  /* stable confetti positions */
  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: seededRand(i * 3) * 100,
        top: 60 + seededRand(i * 3 + 1) * 60,
        delay: seededRand(i * 5) * 1.5,
        isStar: i % 2 === 0,
      })),
    []
  );

  /* downloads */
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
          const r = Math.min(600 / img.width, 800 / img.height);
          const w = img.width * r;
          const h = img.height * r;
          ctx.drawImage(img, (600 - w) / 2, (800 - h) / 2, w, h);
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

  const now = new Date();

  return (
    <div
      className="relative h-full w-full overflow-auto px-4 pb-5 sm:px-6 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: printer area ────────────────────── */}
        <div className="flex min-h-0 flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p
                className="font-mono-booth text-[11px] tracking-[0.2em]"
                style={{ color: "var(--red)" }}
              >
                {w.result.header.step}
              </p>
              <h2
                className="font-display text-3xl leading-none sm:text-4xl"
                style={{ color: "var(--ink)" }}
              >
                {w.result.header.title}
              </h2>
            </div>
            <button
              onClick={onRetake}
              className="font-display shrink-0 cursor-pointer rounded-lg px-4 py-2.5 text-sm transition-transform hover:-translate-y-px"
              style={{
                border: "2.5px solid var(--ink)",
                background: "var(--paper)",
                color: "var(--ink)",
                boxShadow: "0 4px 0 var(--ink)",
              }}
            >
              {w.result.header.retake}
            </button>
          </div>

          {/* printer box */}
          <div
            className="relative min-h-[300px] flex-1 overflow-hidden rounded-2xl"
            style={{
              background: "var(--paper-2)",
              border: "3px solid var(--ink)",
              boxShadow: "0 6px 0 var(--ink)",
            }}
          >
            {/* dot bg */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.4px)",
                backgroundSize: "18px 18px",
                opacity: 0.13,
              }}
            />

            {/* printer mouth */}
            <div
              className="font-mono-booth absolute top-0 right-0 left-0 z-[5] flex items-center justify-center gap-2 text-[11px] tracking-[0.2em]"
              style={{
                height: 60,
                background: "var(--ink)",
                borderBottom: "3px solid var(--ink)",
                color: "var(--paper)",
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background: printing ? "var(--red)" : "var(--gold)",
                  animation: printing ? "twinkle 0.6s infinite ease-in-out" : "none",
                }}
              />
              {printing ? w.result.printer.printing : w.result.printer.done}
              <span className="ml-3 opacity-55">{w.result.printer.version}</span>
            </div>
            <div
              aria-hidden
              className="absolute right-0 left-0 z-[6]"
              style={{
                top: 56,
                height: 8,
                background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)",
              }}
            />

            {/* strip drop — GSAP target */}
            <div
              ref={stripRef}
              className="absolute left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-5 pb-8"
              style={{ top: 80 }}
            >
              <div ref={stripWrapRef}>{layout.render(photos, styleId, meta)}</div>
              <p
                className="font-hand text-2xl transition-opacity duration-400"
                style={{
                  color: "var(--red)",
                  transform: "rotate(-2deg)",
                  opacity: printing ? 0 : 1,
                  transitionDelay: "1.2s",
                }}
              >
                {w.result.printer.tearHere}
              </p>
            </div>

            {/* confetti */}
            {!printing &&
              confetti.map((c, i) => (
                <div
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: `${c.left}%`,
                    top: `${c.top}%`,
                    animation: `confetti 2.4s ${c.delay}s ease-out infinite`,
                  }}
                >
                  {c.isStar ? (
                    <Star5 x={0} y={0} size={14} color="var(--gold)" />
                  ) : (
                    <Sparkle x={0} y={0} size={12} color="var(--red)" />
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* ── RIGHT: downloads + receipt ───────────── */}
        <div className="flex flex-col gap-4">
          {/* download card */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--red)",
            }}
          >
            <p className="font-display text-lg">{w.result.downloads.sectionTitle}</p>
            <p className="font-mono-booth mb-4 text-[9px] tracking-[0.18em] opacity-70">
              {w.result.downloads.sectionSub}
            </p>
            <div className="flex flex-col gap-2">
              <DownloadButton icon={w.result.downloads.strip.icon}  title={w.result.downloads.strip.label}  sub={w.result.downloads.strip.sub} onClick={downloadStrip} />
              <DownloadButton icon={w.result.downloads.photos.icon} title={w.result.downloads.photos.label} sub={`${photos.filter(Boolean).length} ${w.result.downloads.photos.sub}`} onClick={downloadPhotos} />
              <DownloadButton icon={w.result.downloads.video.icon}  title={w.result.downloads.video.label}  sub={w.result.downloads.video.sub} onClick={downloadVideo} />
            </div>
          </div>

          {/* receipt */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            <p className="font-display text-base" style={{ color: "var(--red)" }}>
              {w.result.receipt.title}
            </p>
            <pre
              className="font-mono-booth mt-2 text-[11px] leading-[1.7]"
              style={{ color: "var(--ink)" }}
            >
              {`────────────────────
LAYOUT   ${layout.name.toUpperCase()}
STYLE    ${frameStyle.name.toUpperCase()}
SHOTS    ${photos.length}
DATE     ${now.toLocaleDateString("en-GB").toUpperCase()}
TIME     ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
────────────────────
TOTAL    FREE ✦`}
            </pre>
          </div>

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

      <style>{`
        @keyframes confetti {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(40vh) rotate(420deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
