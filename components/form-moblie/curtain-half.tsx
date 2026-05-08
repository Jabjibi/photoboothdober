import { CSSProperties } from "react";

interface CurtainHalfProps {
  side: "left" | "right";
  curtainStyle: CSSProperties;
}

export function CurtainHalf({ side, curtainStyle }: CurtainHalfProps) {
  const isLeft = side === "left";
  return (
    <div
      data-curtain={side}
      style={{
        position: "absolute",
        ...(isLeft ? { left: 0 } : { right: 0 }),
        top: "12%",
        bottom: 0,
        width: "52%",
        background:
          "repeating-linear-gradient(90deg, var(--paper) 0 12px, var(--paper-2) 12px 16px, var(--paper) 16px 24px)",
        ...(isLeft
          ? {
              borderRight: "1.5px solid var(--ink)",
              boxShadow: "inset -6px 0 12px rgba(0,0,0,0.2)",
            }
          : {
              borderLeft: "1.5px solid var(--ink)",
              boxShadow: "inset 6px 0 12px rgba(0,0,0,0.2)",
            }),
        zIndex: 5,
        ...curtainStyle,
      }}
    >
      {/* scalloped hem */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 14,
          background:
            "radial-gradient(circle at 12% 0, var(--paper) 11px, transparent 12px) repeat-x",
          backgroundSize: "22px 14px",
        }}
      />
    </div>
  );
}
