"use client";

import { useState } from "react";

export const FILTERS = [
  { id: "none",  label: "ORIGINAL", css: "none" },
  { id: "bw",    label: "B&W",      css: "grayscale(1) contrast(1.05)" },
  { id: "warm",  label: "WARM",     css: "saturate(1.15) sepia(0.18) contrast(1.05)" },
  { id: "fairy", label: "FAIRY",    css: "saturate(1.3) brightness(1.05) hue-rotate(-8deg)" },
  { id: "noir",  label: "NOIR",     css: "grayscale(1) contrast(1.4) brightness(0.92)" },
] as const;

export type FilterId = (typeof FILTERS)[number]["id"];

export function useFilter(initial: FilterId = "fairy") {
  const [filter, setFilter] = useState<FilterId>(initial);
  const filterCss = FILTERS.find((f) => f.id === filter)?.css ?? "none";
  return { filter, setFilter, filterCss };
}
