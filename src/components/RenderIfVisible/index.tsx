import React, { useState, useRef, useEffect } from 'react';
import { isServer } from '@core/utils/isServer';

type Props = {
  defaultHeight?: number;
  visibleOffset?: number;
  root?: HTMLElement | null;
  children: React.ReactNode;
};

const RenderIfVisible = ({
  defaultHeight = 300,
  visibleOffset = 1000,
  root = null,
  children,
}: Props): React.ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(isServer);
  const placeholderHeight = useRef<number>(defaultHeight);
  const intersectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (typeof window !== undefined && window.requestIdleCallback) {
          window.requestIdleCallback(
            () => setIsVisible(entries[0].isIntersecting),
            {
              timeout: 600,
            },
          );
        } else {
          setIsVisible(entries[0].isIntersecting);
        }
      },
      { root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` },
    );

    if (intersectionRef.current) observer.observe(intersectionRef.current);

    return () => {
      if (intersectionRef.current) observer.unobserve(intersectionRef.current);
    };
  }, [intersectionRef]);

  useEffect(() => {
    if (intersectionRef.current && isVisible)
      placeholderHeight.current = intersectionRef.current.offsetHeight;

    return () => {
      if (intersectionRef.current)
        placeholderHeight.current = intersectionRef.current.offsetHeight;
    };
  }, [isVisible, intersectionRef]);

  return (
    <div ref={intersectionRef}>
      {isVisible ? (
        <>{children}</>
      ) : (
        <div style={{ height: placeholderHeight.current }} />
      )}
    </div>
  );
};

export default RenderIfVisible;
