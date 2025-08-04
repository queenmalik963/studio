
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type WalkingGiftAnimationProps = {
  giftImage: string;
};

export function WalkingGiftAnimation({ giftImage }: WalkingGiftAnimationProps) {
  if (!giftImage) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: "6rem", // Position it above the footer
        left: 0,
        zIndex: 50,
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "100vw" }}
      transition={{ duration: 5, ease: "linear" }}
    >
      <Image
        src={giftImage}
        alt="Walking gift"
        width={100}
        height={100}
        unoptimized // Important for GIFs
      />
    </motion.div>
  );
}
