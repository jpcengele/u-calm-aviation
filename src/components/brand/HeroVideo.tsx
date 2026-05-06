import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
 * Audio policy: browsers block autoplay of any video that has unmuted
 * audio, so the video MUST start muted to autoplay at all. We expose a
 * small discrete speaker icon in the lower-right of the hero band; click
 * toggles audio on. Restrained, on-brand affordance — no obnoxious
 * banner, no big "click to play" overlay.
 *
 * Layout: full-bleed `object-cover` so the video fills the hero band the
 * same way the BrandImage did. The teal gradient overlay sits above this
 * unchanged, so the H1 + buttons stay legible. The audio toggle sits
 * above both, in the lower-right.
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
  const [muted, setMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync the muted attribute on the video element when state changes.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const toggleMuted = () => {
    setMuted((prev) => !prev);
  };

  // Reduced-motion users get the static image only — no video element ever
  // mounts, no bandwidth wasted, and screen-reader announces the alt text.
  if (reducedMotion) {
    return (
      <BrandImage id={posterImageId} priority className={className} alt={alt} />
    );
  }

  const posterSrc = byId(posterImageId).src;

  return (
    <>
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

      {/* Audio toggle — upper-right of the hero band, subtle and brand-coloured.
          Top-right (not bottom-right) so it doesn't collide with the proof-
          point strip at the bottom of the hero content. Sits ABOVE the
          gradient overlay (z-20) so it's reliably clickable. */}
      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? "Enable sound" : "Mute sound"}
        aria-pressed={!muted}
        className="absolute top-6 right-6 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground/40 hover:bg-foreground/60 backdrop-blur-sm text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
