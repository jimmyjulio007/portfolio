"use client";

import { soundManager } from "@/shared/lib/sound-manager";
import Link from "next/link";

interface ScrollLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ScrollLink({
  href,
  children,
  className,
  ...props
}: ScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Play transition sound
    soundManager.play("transition", { volume: 0.3 });

    // Smooth scroll to target
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
