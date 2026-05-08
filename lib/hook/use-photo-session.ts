"use client";

import { RefObject, useRef, useState } from "react";
import { FILTERS, type FilterId } from "./use-filter";

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

interface UsePhotoSessionOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  stoppedRef: RefObject<boolean>;
  cameraReady: boolean;
  filter: FilterId;
  totalShots: number;
  onComplete: (photos: string[]) => void;
}

export function usePhotoSession({
  videoRef,
  stoppedRef,
  cameraReady,
  filter,
  totalShots,
  onComplete,
}: UsePhotoSessionOptions) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [shotIdx, setShotIdx] = useState(0);
  const [count, setCount] = useState<number | "FLASH" | null>(null);
  const [running, setRunning] = useState(false);
  const [flash, setFlash] = useState(false);

  const captureFrame = (): string | null => {
    const v = videoRef.current;
    if (!v) return null;
    const w = 800;
    const h = Math.round((v.videoHeight / v.videoWidth) * w);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = FILTERS.find((f) => f.id === filter)?.css ?? "none";
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

  const runDemo = () => {
    const demos = makeDemoPhotos(totalShots);
    setPhotos(demos);
    setTimeout(() => onComplete(demos), 600);
  };

  return { photos, shotIdx, count, running, flash, runSession, runDemo };
}
