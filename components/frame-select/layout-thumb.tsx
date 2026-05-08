import type { LayoutId } from "@/lib/booth-context";

interface LayoutThumbProps {
  id: LayoutId;
  active: boolean;
}

/* inline rect helper — plain function, not a React component */
function box(
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string
) {
  return (
    <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1.4" />
  );
}

export function LayoutThumb({ id, active }: LayoutThumbProps) {
  const ink    = active ? "var(--paper)" : "var(--ink)";
  const fill   = active ? "var(--red)"   : "var(--paper-2)";
  const stroke = active ? "var(--paper)" : "var(--ink)";

  return (
    <svg viewBox="0 0 80 60" width="100%" height="48">
      <rect x="1" y="1" width="78" height="58" fill="none" stroke={ink} strokeOpacity="0.25" strokeDasharray="2 2" />

      {id === "strip4" && <>
        {box(28, 4,  24, 11, fill, stroke)}
        {box(28, 17, 24, 11, fill, stroke)}
        {box(28, 30, 24, 11, fill, stroke)}
        {box(28, 43, 24, 11, fill, stroke)}
      </>}

      {id === "trip3h" && <>
        {box(4,  18, 22, 24, fill, stroke)}
        {box(29, 18, 22, 24, fill, stroke)}
        {box(54, 18, 22, 24, fill, stroke)}
      </>}

      {id === "trip3v" && <>
        {box(26, 6,  28, 14, fill, stroke)}
        {box(26, 22, 28, 14, fill, stroke)}
        {box(26, 38, 28, 14, fill, stroke)}
      </>}

      {id === "card1" && <>
        {box(6, 14, 30, 32, fill, stroke)}
        <rect x={40} y={18} width={32} height={4} fill={stroke} />
        <rect x={40} y={26} width={28} height={3} fill={stroke} opacity="0.6" />
        <rect x={40} y={32} width={20} height={3} fill={stroke} opacity="0.6" />
        <rect x={40} y={40} width={26} height={3} fill={stroke} opacity="0.6" />
      </>}
    </svg>
  );
}
