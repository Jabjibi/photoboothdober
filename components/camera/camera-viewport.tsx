import { RefObject } from "react";

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
      {CORNERS.map((pos, i) => (
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
        <span className="inline-block w-2.5 h-2.5 rounded-full animate-twinkle" style={{ background: "var(--red)" }} />
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
        <div aria-hidden className="absolute inset-0 z-[8]" style={{ background: "var(--paper)", opacity: 0.92 }} />
      )}

      {/* camera error */}
      {cameraError && (
        <div
          className="absolute inset-0 z-[9] flex flex-col items-center justify-center text-center p-8"
          style={{ background: "var(--paper)" }}
        >
          <p className="font-display text-2xl" style={{ color: "var(--red)" }}>CAMERA OFFLINE</p>
          <p className="font-mono-booth text-[11px] mt-2 opacity-70">{cameraError}</p>
          <button
            onClick={onDemo}
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
  );
}
