import { CurtainPelmet } from "./curtain-pelmet";
import { CurtainInterior } from "./curtain-interior";
import { CurtainHalf } from "./curtain-half";
import { CurtainRod } from "./curtain-rod";

interface BoothCurtainAreaProps {
  curtainOpen: boolean;
}

export function BoothCurtainArea({ curtainOpen }: BoothCurtainAreaProps) {
  const curtainStyle = {
    transformOrigin: "top" as const,
    ...(curtainOpen ? { transform: "translateY(-110%)" } : {}),
    transition: curtainOpen ? "transform 1.4s 0.4s cubic-bezier(.6,0,.3,1)" : "none",
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "3.9%",
        top: "3.6%",
        bottom: "12.3%",
        width: "52.2%",
        background: "var(--ink)",
        border: "2px solid var(--ink)",
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <CurtainPelmet />
      <CurtainInterior />
      <CurtainHalf side="left" curtainStyle={curtainStyle} />
      <CurtainHalf side="right" curtainStyle={curtainStyle} />
      <CurtainRod />
    </div>
  );
}
