"use client";

import { useEffect, useRef, useState } from "react";
import type { LayoutId } from "@/lib/booth-context";
import { LAYOUTS } from "@/components/frames";

/* ── Filters ────────────────────────────────────────── */
const FILTERS = [
  { id: "none",  label: "ORIGINAL", css: "none" },
  { id: "bw",    label: "B&W",      css: "grayscale(1) contrast(1.05)" },
  { id: "warm",  label: "WARM",     css: "saturate(1.15) sepia(0.18) contrast(1.05)" },
  { id: "fairy", label: "FAIRY",    css: "saturate(1.3) brightness(1.05) hue-rotate(-8deg)" },
  { id: "noir",  label: "NOIR",     css: "grayscale(1) contrast(1.4) brightness(0.92)" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

/* ── Helpers ────────────────────────────────────────── */
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function makeDemoPhotos(n: number): string[] {
  const colors = ["#d8201f", "#161313", "#f5c542", "#ff7a8a"];
  return Array.from({ length: n }, (_, i) => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(0, 0, 600, 800);
    ctx.fillStyle = "#fbf6ee";
    ctx.font = "bold 120px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`0${i + 1}`, 300, 440);
    return canvas.toDataURL("image/jpeg", 0.85);
  });
}

/* ── Component ──────────────────────────────────────── */
interface CameraScreenProps {
  layoutId: LayoutId;
  onComplete: (photos: string[]) => void;
  onBack: () => void;
}

export function CameraScreen({ layoutId, onComplete, onBack }: CameraScreenProps) {
  const layout = LAYOUTS[layoutId];
  const totalShots = layout.shots;

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stoppedRef = useRef(false);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterId>("fairy");
  const [photos, setPhotos] = useState<string[]>([]);
  const [shotIdx, setShotIdx] = useState(0);
  const [count, setCount] = useState<number | "FLASH" | null>(null);
  const [running, setRunning] = useState(false);
  const [flash, setFlash] = useState(false);

  /* camera init — handles React StrictMode double-invoke */
  useEffect(() => {
    let cancelled = false;
    let localStream: MediaStream | null = null;
    const videoEl = videoRef.current;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 960, facingMode: "user" },
          audio: false,
        });
        // If cleanup already ran (StrictMode), discard stream immediately
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        localStream = stream;
        streamRef.current = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          try {
            await videoEl.play();
            if (!cancelled) setCameraReady(true);
          } catch (playErr) {
            // AbortError = play() interrupted by srcObject change (StrictMode cleanup) — not a real failure
            if (!cancelled) setCameraError((playErr as Error).message);
          }
        }
      } catch (err) {
        if (!cancelled) setCameraError((err as Error).message || "Camera access denied");
      }
    };

    stoppedRef.current = false;
    start();

    return () => {
      cancelled = true;
      stoppedRef.current = true;
      localStream?.getTracks().forEach((t) => t.stop());
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (videoEl) videoEl.srcObject = null;
    };
  }, []);

  const captureFrame = (): string | null => {
    const v = videoRef.current;
    if (!v) return null;
    const w = 800;
    const h = Math.round((v.videoHeight / v.videoWidth) * w);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const activeFilter = FILTERS.find((f) => f.id === filter)?.css ?? "none";
    ctx.filter = activeFilter;
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(v, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.88);
  };

  const runSession = async () => {
    if (!cameraReady || running) return;
    setRunning(true);
    setPhotos([]);

    const captured: string[] = [];
    for (let i = 0; i < totalShots; i++) {
      setShotIdx(i);
      for (const n of [3, 2, 1] as const) {
        setCount(n);
        await sleep(900);
        if (stoppedRef.current) return;
      }
      setCount("FLASH");
      setFlash(true);
      await sleep(120);
      const data = captureFrame();
      setFlash(false);
      setCount(null);
      if (data) {
        captured.push(data);
        setPhotos([...captured]);
      }
      await sleep(600);
      if (stoppedRef.current) return;
    }

    setRunning(false);
    await sleep(700);
    onComplete(captured);
  };

  const useDemo = () => {
    const demos = makeDemoPhotos(totalShots);
    setPhotos(demos);
    setTimeout(() => onComplete(demos), 600);
  };

  const filterCss = FILTERS.find((f) => f.id === filter)?.css ?? "none";

  return (
    <div
      className="relative w-full h-full overflow-auto px-4 sm:px-6 pb-5 sm:pb-6"
      style={{ paddingTop: 70 }}
    >
      <div className="screen-grid">
        {/* ── LEFT: viewport ──────────────────────────── */}
        <div className="flex flex-col gap-3 min-h-0">
          {/* header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono-booth text-[11px] tracking-[0.2em]" style={{ color: "var(--red)" }}>
                STEP 03 · INSIDE THE BOOTH
              </p>
              <h2 className="font-display text-3xl sm:text-4xl leading-none" style={{ color: "var(--ink)" }}>
                SMILE × {totalShots}
              </h2>
            </div>
            <button
              onClick={onBack}
              className="font-display shrink-0 text-sm px-4 py-2.5 rounded-lg cursor-pointer
                transition-transform hover:-translate-y-px"
              style={{
                border: "2.5px solid var(--ink)",
                background: "var(--paper)",
                color: "var(--ink)",
                boxShadow: "0 4px 0 var(--ink)",
              }}
            >
              ← change frame
            </button>
          </div>

          {/* camera viewport */}
          <div
            className="flex-1 relative overflow-hidden rounded-2xl flex items-center justify-center min-h-[280px]"
            style={{
              background: "var(--ink)",
              border: "4px solid var(--ink)",
              boxShadow: "0 8px 0 var(--red-deep)",
            }}
          >
            {/* pelmet stripe */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 z-[4]"
              style={{
                height: 22,
                background: "repeating-linear-gradient(90deg, var(--red) 0 18px, var(--paper) 18px 36px)",
                borderBottom: "2px solid var(--ink)",
              }}
            />

            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ filter: filterCss, transform: "scaleX(-1)" }}
            />

            {/* viewfinder corners */}
            {(
              [
                { top: 38, left: 18 },
                { top: 38, right: 18 },
                { bottom: 22, left: 18 },
                { bottom: 22, right: 18 },
              ] as const
            ).map((pos, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute w-[26px] h-[26px] z-[5]"
                style={{
                  ...pos,
                  borderTop:    "top"    in pos ? "none" : "3px solid var(--paper)",
                  borderBottom: "bottom" in pos ? "none" : "3px solid var(--paper)",
                  borderLeft:   "left"   in pos ? "none" : "3px solid var(--paper)",
                  borderRight:  "right"  in pos ? "none" : "3px solid var(--paper)",
                }}
              />
            ))}

            {/* REC indicator */}
            <div
              className="absolute top-8 left-5 z-[6] flex items-center gap-2 font-mono-booth text-[10px] tracking-[0.18em]"
              style={{ color: "var(--paper)" }}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full animate-twinkle"
                style={{ background: "var(--red)" }}
              />
              REC · {String(shotIdx + 1).padStart(2, "0")} / {String(totalShots).padStart(2, "0")}
            </div>

            {/* countdown overlay */}
            {count !== null && (
              <div
                className="absolute inset-0 z-[7] flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.18)" }}
              >
                <span
                  className="font-display leading-none"
                  style={{
                    fontSize: typeof count === "number" ? "clamp(120px,18vw,240px)" : "clamp(48px,8vw,100px)",
                    color: "var(--paper)",
                    WebkitTextStroke: "4px var(--ink)",
                  }}
                >
                  {count}
                </span>
              </div>
            )}

            {/* flash overlay */}
            {flash && (
              <div
                aria-hidden
                className="absolute inset-0 z-[8]"
                style={{ background: "var(--paper)", opacity: 0.92 }}
              />
            )}

            {/* camera error */}
            {cameraError && (
              <div
                className="absolute inset-0 z-[9] flex flex-col items-center justify-center text-center p-8"
                style={{ background: "var(--paper)" }}
              >
                <p className="font-display text-2xl" style={{ color: "var(--red)" }}>
                  CAMERA OFFLINE
                </p>
                <p className="font-mono-booth text-[11px] mt-2 opacity-70">{cameraError}</p>
                <button
                  onClick={useDemo}
                  className="font-display mt-5 px-5 py-3 rounded-xl cursor-pointer text-sm"
                  style={{
                    background: "var(--red)",
                    color: "var(--paper)",
                    border: "3px solid var(--ink)",
                    boxShadow: "0 4px 0 var(--ink)",
                  }}
                >
                  ▸ USE DEMO PHOTOS
                </button>
              </div>
            )}
          </div>

          {/* filter row */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1">
            <p className="font-mono-booth text-[10px] tracking-[0.18em] opacity-70 shrink-0">FILTER ›</p>
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  disabled={running}
                  className="font-mono-booth shrink-0 text-[11px] tracking-[0.1em] px-3 py-1.5 rounded-full cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: active ? "var(--ink)" : "var(--paper)",
                    color: active ? "var(--paper)" : "var(--ink)",
                    border: "2px solid var(--ink)",
                    boxShadow: active ? "0 3px 0 var(--red)" : "0 3px 0 var(--ink)",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: shot tracker + controls ──────────── */}
        <div className="flex flex-col gap-4">
          {/* shot grid */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
            }}
          >
            <p className="font-display text-base" style={{ color: "var(--red)" }}>SHOTS</p>
            <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60 mb-3">
              {layout.name.toUpperCase()} · {totalShots} REQUIRED
            </p>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${Math.min(totalShots, 2)}, 1fr)` }}
            >
              {Array.from({ length: totalShots }).map((_, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center"
                  style={{
                    background: photos[i] ? "var(--ink)" : "var(--paper-2)",
                    border: "2px solid var(--ink)",
                    boxShadow: i === shotIdx && running ? "0 0 0 3px var(--red)" : "none",
                  }}
                >
                  {photos[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photos[i]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span
                      className="font-display text-3xl"
                      style={{ color: "var(--ink)", opacity: 0.4 }}
                    >
                      0{i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* start card */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--red)",
            }}
          >
            <p className="font-hand text-2xl leading-none">ready? strike a pose ✦</p>
            <p className="font-mono-booth text-[10px] tracking-[0.16em] opacity-70 mt-2">
              3-SECOND TIMER PER SHOT · AUTO-PRINT WHEN DONE
            </p>
            <button
              onClick={runSession}
              disabled={!cameraReady || running}
              className="font-display w-full mt-3 py-4 rounded-xl text-2xl tracking-[0.06em] cursor-pointer disabled:cursor-not-allowed transition-opacity"
              style={{
                background: running ? "var(--paper-2)" : "var(--red)",
                color: running ? "var(--ink)" : "var(--paper)",
                border: "3px solid var(--paper)",
                opacity: !cameraReady && !cameraError ? 0.5 : 1,
              }}
            >
              {running
                ? "SHOOTING…"
                : photos.length === totalShots
                  ? "↺ RETAKE ALL"
                  : "▸ START SHOOTING ◂"}
            </button>
            {!cameraReady && !cameraError && (
              <p className="font-mono-booth text-[9px] mt-2 tracking-[0.15em] opacity-70">
                WAITING FOR CAMERA…
              </p>
            )}
          </div>

          {/* tips */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "var(--paper-2)",
              border: "3px dashed var(--ink)",
            }}
          >
            <p className="font-mono-booth text-[9px] tracking-[0.18em] opacity-60 mb-2">TIPS</p>
            <ul className="text-sm leading-relaxed list-disc pl-4">
              <li>face the light — the booth is bright but the sparkle is brighter</li>
              <li>hold poses through the flash</li>
              <li>switch the filter mid-set — every shot can have its own vibe</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
