import { RefObject } from "react";
import w from "@/lib/wording.json";

interface CameraViewportProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  filterCss: string;
  shotIdx: number;
  totalShots: number;
  count: number | "FLASH" | null;
  flash: boolean;
  cameraError: string | null;
  onDemo: () => void;
}

const CORNERS = [
  { top: 38, left: 18 },
  { top: 38, right: 18 },
  { bottom: 22, left: 18 },
  { bottom: 22, right: 18 },
] as const;

export function CameraViewport({
  videoRef,
  filterCss,
  shotIdx,
  totalShots,
  count,
  flash,
  cameraError,
  onDemo,
}: CameraViewportProps) {
  return (
    <div
      className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-2xl"
      style={{
        background: "var(--ink)",
        border: "4px solid var(--ink)",
        boxShadow: "0 8px 0 var(--red-deep)",
      }}
    >
      {/* pelmet stripe */}
      <div
        aria-hidden
        className="absolute top-0 right-0 left-0 z-[4]"
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
        className="h-full w-full object-cover"
        style={{ filter: filterCss, transform: "scaleX(-1)" }}
      />

      {/* viewfinder corners */}
      {CORNERS.map((pos, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute z-[5] h-[26px] w-[26px]"
          style={{
            ...pos,
            borderTop: "top" in pos ? "none" : "3px solid var(--paper)",
            borderBottom: "bottom" in pos ? "none" : "3px solid var(--paper)",
            borderLeft: "left" in pos ? "none" : "3px solid var(--paper)",
            borderRight: "right" in pos ? "none" : "3px solid var(--paper)",
          }}
        />
      ))}

      {/* REC indicator */}
      <div
        className="font-mono-booth absolute top-8 left-5 z-[6] flex items-center gap-2 text-[10px] tracking-[0.18em]"
        style={{ color: "var(--paper)" }}
      >
        <span
          className="animate-twinkle inline-block h-2.5 w-2.5 rounded-full"
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
              fontSize:
                typeof count === "number" ? "clamp(120px,18vw,240px)" : "clamp(48px,8vw,100px)",
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
          className="absolute inset-0 z-[9] flex flex-col items-center justify-center p-8 text-center"
          style={{ background: "var(--paper)" }}
        >
          <p className="font-display text-2xl" style={{ color: "var(--red)" }}>
            {w.camera.viewport.offline}
          </p>
          <p className="font-mono-booth mt-2 text-[11px] opacity-70">{cameraError}</p>
          <button
            onClick={onDemo}
            className="font-display mt-5 cursor-pointer rounded-xl px-5 py-3 text-sm"
            style={{
              background: "var(--red)",
              color: "var(--paper)",
              border: "3px solid var(--ink)",
              boxShadow: "0 4px 0 var(--ink)",
            }}
          >
            {w.camera.viewport.useDemo}
          </button>
        </div>
      )}
    </div>
  );
}
