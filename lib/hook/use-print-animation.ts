"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface UsePrintAnimationResult {
  printing: boolean;
  containerMinH: number;
  stripRef: React.RefObject<HTMLDivElement | null>;
  stripWrapRef: React.RefObject<HTMLDivElement | null>;
}

const STRIP_TOP_OFFSET = 80;
const STRIP_BOTTOM_PAD = 32;

export function usePrintAnimation(): UsePrintAnimationResult {
  const [printing, setPrinting] = useState(true);
  const [containerMinH, setContainerMinH] = useState(300);
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
            if (stripRef.current) {
              setContainerMinH(stripRef.current.offsetHeight + STRIP_TOP_OFFSET + STRIP_BOTTOM_PAD);
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

  return { printing, containerMinH, stripRef, stripWrapRef };
}
