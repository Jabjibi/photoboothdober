"use client";

import { useMemo } from "react";

interface ConfettiItem {
  left: number;
  top: number;
  delay: number;
  isStar: boolean;
}

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function useConfetti(count = 18): ConfettiItem[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seededRand(i * 3) * 100,
        top: 60 + seededRand(i * 3 + 1) * 60,
        delay: seededRand(i * 5) * 1.5,
        isStar: i % 2 === 0,
      })),
    [count]
  );
}
