
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Gift as GiftType } from "./GiftPanel";

type GiftJumpAnimationProps = {
  gift: GiftType;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
};

export function GiftJumpAnimation({
  gift,
  startX,
  startY,
  endX,
  endY,
  onComplete,
}: GiftJumpAnimationProps) {
  return (
    <motion.div
      style={{
        position: "fixed",
        left: startX,
        top: startY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 100,
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        x: endX - startX,
        y: endY - startY,
        scale: [1, 1.2, 0.2],
        rotate: [0, 20, -20, 0],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      onAnimationComplete={onComplete}
    >
      <Image
        src={gift.image}
        alt={gift.name}
        width={64}
        height={64}
        
      />
    </motion.div>
  );
}
