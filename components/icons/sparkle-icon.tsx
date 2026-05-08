import type { SVGProps } from "react";

/** 4-point sparkle star — pure SVG icon, no positioning or animation */
export function SparkleIcon({ color = "currentColor", ...props }: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill={color} {...props}>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  );
}
