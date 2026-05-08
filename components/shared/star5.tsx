import { Star5Icon } from "@/components/icons/star5-icon";

interface Star5Props {
  x: number;
  y: number;
  size?: number;
  delay?: number;
  color?: string;
  rotate?: number;
}

/** Positioned + animated 5-point star for decorative use */
export function Star5({ x, y, size = 18, delay = 0, color = "var(--gold)", rotate = 0 }: Star5Props) {
  return (
    <Star5Icon
      color={color}
      style={{
        position: "absolute",
        left: `${x.toFixed(4)}%`,
        top: `${y.toFixed(4)}%`,
        width: size,
        height: size,
        transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
        animation: `twinkle 3s ${delay}s infinite ease-in-out`,
        flexShrink: 0,
      }}
    />
  );
}
