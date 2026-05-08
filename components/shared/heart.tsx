import { HeartIcon } from "@/components/icons/heart-icon";

interface HeartProps {
  x: number;
  y: number;
  size?: number;
  delay?: number;
}

/** Positioned + animated heart for decorative use */
export function Heart({ x, y, size = 14, delay = 0 }: HeartProps) {
  return (
    <HeartIcon
      color="var(--red)"
      style={{
        position: "absolute",
        left: `${x.toFixed(4)}%`,
        top: `${y.toFixed(4)}%`,
        width: size,
        height: size,
        transform: "translate(-50%,-50%)",
        animation: `twinkle 2.8s ${delay}s infinite ease-in-out`,
        flexShrink: 0,
      }}
    />
  );
}
