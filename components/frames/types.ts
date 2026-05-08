import type { StyleId, FrameMeta } from "@/lib/booth-context";

export interface FrameProps {
  photos: string[];
  styleId: StyleId;
  meta: FrameMeta;
}

export interface FrameStyle {
  name: string;
  palette: { bg: string; paper: string; ink: string; accent: string };
  vibe: string;
}

export const FRAME_STYLES: Record<StyleId, FrameStyle> = {
  classic: { name: "Classic Strip",  palette: { bg: "#161313", paper: "#fbf6ee", ink: "#161313", accent: "#d8201f" }, vibe: "minimal" },
  news:    { name: "Breaking News",  palette: { bg: "#fbf6ee", paper: "#fbf6ee", ink: "#161313", accent: "#161313" }, vibe: "news"    },
  fairy:   { name: "Fairy Sparkle",  palette: { bg: "#ffe9ec", paper: "#fff7f8", ink: "#a3120f", accent: "#d8201f" }, vibe: "fairy"   },
  retro:   { name: "Retro Pop",      palette: { bg: "#d8201f", paper: "#fbf6ee", ink: "#161313", accent: "#f5c542" }, vibe: "pop"     },
};
