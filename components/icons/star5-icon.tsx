import type { SVGProps } from "react";

/** 5-point star — pure SVG icon, no positioning or animation */
export function Star5Icon({
  color = "currentColor",
  strokeColor = "var(--ink)",
  ...props
}: SVGProps<SVGSVGElement> & { color?: string; strokeColor?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill={color}
      stroke={strokeColor}
      strokeWidth="1.2"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2 L14.6 9.2 L22 9.6 L16.2 14.2 L18.2 21.4 L12 17.2 L5.8 21.4 L7.8 14.2 L2 9.6 L9.4 9.2 Z" />
    </svg>
  );
}
