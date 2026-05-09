import w from "@/lib/wording.json";

interface ShotGridProps {
  photos: string[];
  totalShots: number;
  shotIdx: number;
  running: boolean;
  layoutName: string;
}

export function ShotGrid({ photos, totalShots, shotIdx, running, layoutName }: ShotGridProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: "6px 6px 0 var(--ink)",
      }}
    >
      <p className="font-display text-base" style={{ color: "var(--red)" }}>
        {w.camera.shotGrid.title}
      </p>
      <p className="font-mono-booth mb-3 text-[9px] tracking-[0.18em] opacity-60">
        {layoutName.toUpperCase()} · {totalShots} REQUIRED
      </p>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.min(totalShots, 2)}, 1fr)` }}
      >
        {Array.from({ length: totalShots }).map((_, i) => (
          <div
            key={i}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg"
            style={{
              background: photos[i] ? "var(--ink)" : "var(--paper-2)",
              border: "2px solid var(--ink)",
              boxShadow: i === shotIdx && running ? "0 0 0 3px var(--red)" : "none",
            }}
          >
            {photos[i] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photos[i]} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-3xl" style={{ color: "var(--ink)", opacity: 0.4 }}>
                0{i + 1}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
