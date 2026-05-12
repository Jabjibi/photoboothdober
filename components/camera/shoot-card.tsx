import w from "@/lib/wording.json";

interface ShootCardProps {
  cameraReady: boolean;
  cameraError: string | null;
  running: boolean;
  photosDone: boolean;
  onStart: () => void;
}

export function ShootCard({
  cameraReady,
  cameraError,
  running,
  photosDone,
  onStart,
}: ShootCardProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--red)",
      }}
    >
      <p className="font-hand text-2xl leading-none">{w.camera.shootCard.title}</p>
      <p className="font-mono-booth mt-2 text-[10px] tracking-[0.16em] opacity-70">
        {w.camera.shootCard.subtitle}
      </p>
      <button
        onClick={onStart}
        disabled={!cameraReady || running}
        className="font-display mt-3 w-full cursor-pointer rounded-xl py-4 text-2xl tracking-[0.06em] transition-opacity disabled:cursor-not-allowed"
        style={{
          background: running ? "var(--paper-2)" : "var(--red)",
          color: running ? "var(--ink)" : "var(--paper)",
          border: "3px solid var(--paper)",
          opacity: !cameraReady && !cameraError ? 0.5 : 1,
        }}
      >
        {running
          ? w.camera.shootCard.shooting
          : photosDone
            ? w.camera.shootCard.retake
            : w.camera.shootCard.start}
      </button>
      {!cameraReady && !cameraError && (
        <p className="font-mono-booth mt-2 text-[9px] tracking-[0.15em] opacity-70">
          {w.camera.shootCard.waitingCamera}
        </p>
      )}
    </div>
  );
}
