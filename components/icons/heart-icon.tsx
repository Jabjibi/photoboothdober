import type { SVGProps } from "react";

/** Heart shape — pure SVG icon, no positioning or animation */
export function HeartIcon({ color = "currentColor", ...props }: SVGProps<SVGSVGElement> & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill={color} {...props}>
      <path d="M12 21s-7-4.5-9.5-9C.7 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.3 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}
