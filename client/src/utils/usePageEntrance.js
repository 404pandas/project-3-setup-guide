import { useEffect, useRef } from "react";
import { gsap } from "./gsap";

/**
 * Fades + slides up children of the returned ref on mount.
 * Pass `deps` to re-trigger when data loads (e.g. after Apollo resolves).
 */
const usePageEntrance = (deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};

export default usePageEntrance;
