"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface UsePrintAnimationResult {
  printing: boolean;
  stripRef: React.RefObject<HTMLDivElement | null>;
  stripWrapRef: React.RefObject<HTMLDivElement | null>;
}

export function usePrintAnimation(): UsePrintAnimationResult {
  const [printing, setPrinting] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stripRef.current) return;
      gsap.fromTo(
        stripRef.current,
        { y: -700 },
        {
          y: 0,
          duration: 1.6,
          delay: 0.25,
          ease: "power3.out",
          onComplete: () => {
            // Clear GSAP's inline transform so the strip re-enters normal flow
            if (stripRef.current) {
              gsap.set(stripRef.current, { clearProps: "transform" });
            }
            setPrinting(false);
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (printing || !stripWrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(stripWrapRef.current, {
        rotation: 1.2,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "top center",
      });
    });
    return () => ctx.revert();
  }, [printing]);

  return { printing, stripRef, stripWrapRef };
}
