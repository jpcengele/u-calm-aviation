import { useEffect, useRef, useState } from "react";
import { BrandImage } from "./BrandImage";
import { byId } from "@/brand/imagery";

/**
 * HeroVideo — autoplay/muted/loop video for the home hero band, with a
 * static BrandImage poster as fallback for:
 *   - users with `prefers-reduced-motion: reduce` (accessibility)
 *   - browsers that fail to autoplay (some mobile / battery-saver)
 *   - slow connections that haven't downloaded the video yet (poster shows
 *     immediately and stays until the video is buffered)
 *   - any environment where <video> fails (the <BrandImage> is rendered
 *     INSIDE the <video> as the final inner-fallback)
 *
 * Layout: full-bleed `object-cover` so the video fills the hero band the
 * same way the BrandImage did. The teal gradient overlay sits above this
 * unchanged, so the H1 + buttons stay legible.
 *
 * Wired into Index.tsx's §1 hero. Add new hero videos by adding entries
 * to the constants at the top of Index.tsx.
 */
interface HeroVideoProps {
  /** Path under /public, e.g. "/brand/hero/cabin-window-cumulus.mp4" */
  videoSrc: string;
  /** ID in BRAND_IMAGES for the poster + reduced-motion fallback */
  posterImageId: number;
  /** className passed through to both <video> and the fallback <BrandImage> */
  className?: string;
  /** Accessible label for the video — describes what's happening */
  alt: string;
}

export function HeroVideo({
  videoSrc,
  posterImageId,
  className,
  alt,
}: HeroVideoProps) {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reduced-motion users get the static image only — no video element ever
  // mounts, no bandwidth wasted, and screen-reader announces the alt text.
  if (reducedMotion) {
    return (
      <BrandImage id={posterImageId} priority className={className} alt={alt} />
    );
  }

  const posterSrc = byId(posterImageId).src;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={posterSrc}
      aria-label={alt}
      className={className}
    >
      <source src={videoSrc} type="video/mp4" />
      {/* Inner fallback if <video> can't render at all */}
      <BrandImage id={posterImageId} priority className={className} alt={alt} />
    </video>
  );
}
