
"use client";

import Image from "next/image";

type WalkingGiftAnimationProps = {
  giftImage: string;
};

export function WalkingGiftAnimation({ giftImage }: WalkingGiftAnimationProps) {
  if (!giftImage) return null;

  return (
    <div
      className="fixed bottom-24 left-0 z-50 animate-walk-across"
    >
      <Image
        src={giftImage}
        alt="Walking gift"
        width={100}
        height={100}
        unoptimized // Important for GIFs
      />
    </div>
  );
}
