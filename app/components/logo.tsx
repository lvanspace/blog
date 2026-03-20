"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export function LogoBoom() {
  const [boom, setBoom] = useState<{
    show: boolean;
    x: number;
    y: number;
    scale: number;
  }>({ show: false, x: 0, y: 0, scale: 14 });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (boom.show) {
      timer = setTimeout(() => setBoom((b) => ({ ...b, show: false })), 900);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [boom.show]);

  const triggerBoom = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const size = 120;
    const scale =
      (Math.max(window.innerWidth, window.innerHeight) / size) * 1.4;
    setBoom({ show: true, x: centerX, y: centerY, scale });
  };

  return (
    <>
      <span
        className="inline-flex items-center gap-2 cursor-pointer"
        onMouseEnter={triggerBoom}
      >
        <Image
          src="/favicon.svg"
          alt="李宇Blog 标识"
          width={28}
          height={28}
          className="shrink-0"
        />
        <span>李宇Blog · 见字如面</span>
      </span>

      {boom.show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Image
            src="/favicon.svg"
            alt="李宇Blog 标识放大动画"
            width={120}
            height={120}
            className="logo-boom"
            style={{
              left: boom.x,
              top: boom.y,
              ["--boom-scale" as string]: `${boom.scale}`,
            }}
            priority
          />
        </div>
      )}
    </>
  );
}
