"use client";

import { useEffect, useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stoppedRef = useRef(false);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

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
        // Discard immediately if cleanup already ran (React StrictMode double-invoke)
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStream = stream;
        streamRef.current = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          try {
            await videoEl.play();
            if (!cancelled) setCameraReady(true);
          } catch (playErr) {
            // AbortError = play() interrupted by srcObject change during StrictMode cleanup
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

  return { videoRef, stoppedRef, cameraReady, cameraError };
}
