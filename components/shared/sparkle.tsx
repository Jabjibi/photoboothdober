import { SparkleIcon } from "@/components/icons/sparkle-icon";

interface SparkleProps {
  x: number;
  y: number;
  size?: number;
  delay?: number;
  color?: string;
}

/** Positioned + animated sparkle for decorative use */
export function Sparkle({ x, y, size = 14, delay = 0, color = "var(--red)" }: SparkleProps) {
  return (
    <SparkleIcon
      color={color}
      style={{
        position: "absolute",
        left: `${x.toFixed(4)}%`,
        top: `${y.toFixed(4)}%`,
        width: size,
        height: size,
        transform: "translate(-50%,-50%)",
        animation: `twinkle 2.4s ${delay}s infinite ease-in-out`,
        flexShrink: 0,
      }}
    />
  );
}
