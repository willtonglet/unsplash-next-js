import { useState, useEffect, RefObject } from 'react';

export default function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T>,
  rootMargin = '0px',
  once?: boolean,
  threshold?: number,
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          if (once && ref.current && entries[0].isIntersecting) {
            setIntersecting(true);
            observer.unobserve(ref.current);
          }

          setIntersecting(entries.some((entry) => entry.isIntersecting));
        },
        {
          rootMargin,
          threshold,
        },
      );
      if (ref.current) observer.observe(ref.current);
    }
    return () => {
      if (observer && ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
}
