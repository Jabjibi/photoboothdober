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
        top: 30,
        bottom: 0,
        width: "52%",
        background:
          "repeating-linear-gradient(90deg, var(--paper) 0 14px, var(--paper-2) 14px 18px, var(--paper) 18px 28px)",
        ...(isLeft
          ? { borderRight: "2px solid var(--ink)", boxShadow: "inset -8px 0 16px rgba(0,0,0,0.2)" }
          : { borderLeft: "2px solid var(--ink)", boxShadow: "inset 8px 0 16px rgba(0,0,0,0.2)" }),
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
          height: 18,
          background:
            "radial-gradient(circle at 12% 0, var(--paper) 14px, transparent 15px) repeat-x",
          backgroundSize: "26px 18px",
        }}
      />
    </div>
  );
}
