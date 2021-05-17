import { useEffect, useState } from 'react';

export function useScrollBottom() {
  const [isBottom, setIsBottom] = useState(false);

  const onScroll = () => {
    setIsBottom(
      window.innerHeight + window.scrollY >= document.body.offsetHeight,
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  }, []);

  return [isBottom];
}
