"use client";

import { createContext, use, useState } from "react";

/* ── Types ─────────────────────────────────────────── */
export type Screen = "booth" | "frame" | "camera" | "result";
export type LayoutId = "strip4" | "trip3h" | "trip3v" | "card1";
export type StyleId = "classic" | "news" | "fairy" | "retro";

export interface FrameMeta {
  name?: string;
  birthday?: string;
  title?: string;
  date?: string;
}

export interface BoothConfig {
  layoutId: LayoutId;
  styleId: StyleId;
  meta: FrameMeta;
}

interface BoothState {
  screen: Screen;
  config: BoothConfig;
  photos: string[];
}

interface BoothActions {
  goTo: (screen: Screen) => void;
  setConfig: (cfg: BoothConfig) => void;
  setPhotos: (photos: string[]) => void;
  restart: () => void;
}

interface BoothContextValue {
  state: BoothState;
  actions: BoothActions;
}

/* ── Context ────────────────────────────────────────── */
const BoothContext = createContext<BoothContextValue | null>(null);

const DEFAULT_CONFIG: BoothConfig = {
  layoutId: "strip4",
  styleId: "fairy",
  meta: { name: "ANNA SPARKS", birthday: "07.26.2000", title: "TEXTURE USER" },
};

export function BoothProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>("booth");
  const [config, setConfigState] = useState<BoothConfig>(DEFAULT_CONFIG);
  const [photos, setPhotosState] = useState<string[]>([]);

  const actions: BoothActions = {
    goTo: setScreen,
    setConfig: (cfg) => {
      setConfigState(cfg);
      setPhotosState([]);
    },
    setPhotos: setPhotosState,
    restart: () => {
      setScreen("booth");
      setPhotosState([]);
      setConfigState(DEFAULT_CONFIG);
    },
  };

  return (
    <BoothContext value={{ state: { screen, config, photos }, actions }}>{children}</BoothContext>
  );
}

export function useBoothContext() {
  const ctx = use(BoothContext);
  if (!ctx) throw new Error("useBoothContext must be used inside <BoothProvider>");
  return ctx;
}
