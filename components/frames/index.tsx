import type { LayoutId, StyleId, FrameMeta } from "@/lib/booth-context";
import { Strip4 } from "./strip4";
import { Strip3H } from "./strip3h";
import { Strip3V } from "./strip3v";
import { CardFrame } from "./card-frame";

export { FRAME_STYLES } from "./types";
export { Strip4, Strip3H, Strip3V, CardFrame };

export interface LayoutDef {
  id: LayoutId;
  name: string;
  shots: number;
  render: (photos: string[], styleId: StyleId, meta: FrameMeta) => React.ReactNode;
}

export const LAYOUTS: Record<LayoutId, LayoutDef> = {
  strip4: {
    id: "strip4", name: "4 Cell Strip", shots: 4,
    render: (p, s, m) => <Strip4  photos={p} styleId={s} meta={m} />,
  },
  trip3h: {
    id: "trip3h", name: "3 Across", shots: 3,
    render: (p, s, m) => <Strip3H photos={p} styleId={s} meta={m} />,
  },
  trip3v: {
    id: "trip3v", name: "3 Stacked", shots: 3,
    render: (p, s, m) => <Strip3V photos={p} styleId={s} meta={m} />,
  },
  card1: {
    id: "card1", name: "Creative License", shots: 1,
    render: (p, s, m) => <CardFrame photos={p} styleId={s} meta={m} />,
  },
};
