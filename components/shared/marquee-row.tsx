"use client";

import { useEffect, useState } from "react";

function Bulb({ on }: { on: boolean }) {
  return (
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: on ? "var(--gold)" : "#7a5e1c",
        boxShadow: on
          ? "0 0 8px var(--gold), 0 0 14px rgba(245,197,66,0.6)"
          : "inset 0 0 4px rgba(0,0,0,0.5)",
        display: "inline-block",
        transition: "background 200ms, box-shadow 200ms",
        flexShrink: 0,
      }}
    />
  );
}

interface MarqueeRowProps {
  count?: number;
}

export function MarqueeRow({ count = 14 }: MarqueeRowProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 280);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Bulb key={i} on={(i + tick) % 2 === 0} />
      ))}
    </div>
  );
}
