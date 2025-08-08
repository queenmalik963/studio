
"use client";

import Image from "next/image";
import { type Gift as GiftType } from "./GiftPanel";
import { useEffect, useState } from "react";

type GiftJumpAnimationProps = {
  gift: GiftType;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
};

// This is now a simple, non-animated component to prevent errors from framer-motion.
export function GiftJumpAnimation({
  gift,
  startX,
  startY,
  endX,
  endY,
  onComplete,
}: GiftJumpAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
    }, 1200); // Mimics the duration of the old animation

    return () => clearTimeout(timer);
  }, [onComplete]);
  
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: endX,
        top: endY,
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        opacity: 0, // It will be invisible but will complete its lifecycle
      }}
    >
      <Image
        src={gift.image}
        alt={gift.name}
        width={64}
        height={64}
      />
    </div>
  );
}
