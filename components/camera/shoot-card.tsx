interface ShootCardProps {
  cameraReady: boolean;
  cameraError: string | null;
  running: boolean;
  photosDone: boolean;
  onStart: () => void;
}

export function ShootCard({ cameraReady, cameraError, running, photosDone, onStart }: ShootCardProps) {
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
      <p className="font-hand text-2xl leading-none">ready? strike a pose ✦</p>
      <p className="font-mono-booth text-[10px] tracking-[0.16em] opacity-70 mt-2">
        3-SECOND TIMER PER SHOT · AUTO-PRINT WHEN DONE
      </p>
      <button
        onClick={onStart}
        disabled={!cameraReady || running}
        className="font-display w-full mt-3 py-4 rounded-xl text-2xl tracking-[0.06em] cursor-pointer disabled:cursor-not-allowed transition-opacity"
        style={{
          background: running ? "var(--paper-2)" : "var(--red)",
          color: running ? "var(--ink)" : "var(--paper)",
          border: "3px solid var(--paper)",
          opacity: !cameraReady && !cameraError ? 0.5 : 1,
        }}
      >
        {running ? "SHOOTING…" : photosDone ? "↺ RETAKE ALL" : "▸ START SHOOTING ◂"}
      </button>
      {!cameraReady && !cameraError && (
        <p className="font-mono-booth text-[9px] mt-2 tracking-[0.15em] opacity-70">
          WAITING FOR CAMERA…
        </p>
      )}
    </div>
  );
}
