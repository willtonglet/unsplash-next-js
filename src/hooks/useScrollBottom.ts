import { useState, useRef, useEffect } from 'react';

export function useScrollBottom<T extends HTMLElement>(offset?: number) {
  const [atBottom, setAtBottom] = useState(false);
  const scrollEl = useRef<T>(null);

  useEffect(() => {
    const { current } = scrollEl;

    const withOffset =
      offset === undefined && current ? current.clientHeight : offset;

    const handleScroll = () => {
      if (
        current &&
        withOffset &&
        current.scrollTop + current.clientHeight + withOffset >=
          current.scrollHeight
      ) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };

    if (current) current.addEventListener('scroll', handleScroll);

    return () => {
      if (current) current.removeEventListener('scroll', handleScroll);
    };
  }, [scrollEl.current, offset]);

  return [scrollEl, atBottom] as const;
}
