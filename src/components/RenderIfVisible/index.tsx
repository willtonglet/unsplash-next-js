import React, { useRef, useEffect } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

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
  const placeholderHeight = useRef<number>(defaultHeight);
  const intersectionRef = useRef<HTMLDivElement>(null);

  const entry = useIntersectionObserver(intersectionRef, {
    freezeOnceVisible: false,
    root,
    rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (intersectionRef.current && isVisible)
      placeholderHeight.current = intersectionRef.current.offsetHeight;
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
