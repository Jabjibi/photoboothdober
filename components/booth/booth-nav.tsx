type Step = "BOOTH" | "FRAME" | "CAMERA" | "PRINT";

interface BoothNavProps {
  currentStep: Step;
}

const STEPS: Step[] = ["BOOTH", "FRAME", "CAMERA", "PRINT"];

export function BoothNav({ currentStep }: BoothNavProps) {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="pointer-events-none absolute top-4 right-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6">
      {/* Brand mark */}
      <div
        className="font-display pointer-events-auto flex items-center gap-2 sm:gap-2.5"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "7px 14px 7px 10px",
          borderRadius: 999,
          fontSize: "clamp(12px, 1.2vw, 15px)",
          letterSpacing: "0.04em",
          boxShadow: "0 4px 0 var(--red-deep)",
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--red)",
            display: "inline-block",
            boxShadow: "inset 0 0 0 3px var(--paper), 0 0 0 2px var(--ink)",
            flexShrink: 0,
          }}
        />
        <span>SPARKLE BOOTH</span>
        <span
          className="font-mono-booth hidden sm:inline"
          style={{ opacity: 0.5, fontSize: 11, marginLeft: 6, letterSpacing: "0.1em" }}
        >
          EST · 26
        </span>
      </div>

      {/* Step pill */}
      <div
        className="font-mono-booth hidden items-center gap-2 sm:flex"
        style={{
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          padding: "6px 12px",
          borderRadius: 999,
          fontSize: 12,
          boxShadow: "4px 4px 0 var(--ink)",
        }}
      >
        {STEPS.map((label, i) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i <= currentIndex ? "var(--red)" : "var(--ink)",
                opacity: i <= currentIndex ? 1 : 0.25,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: i === currentIndex ? "var(--red)" : "var(--ink)",
                opacity: i === currentIndex ? 1 : 0.45,
                fontWeight: i === currentIndex ? 700 : 400,
              }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
