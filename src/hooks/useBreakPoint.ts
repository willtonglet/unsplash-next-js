import { useEffect, useState } from 'react';
import { mq } from '@core/utils/mq';
import { useWindowSize } from './useWindowSize';

export const useBreakpoint = (): string | undefined => {
  const [breakpoint, setBreakpoint] = useState('xs');
  const { width } = useWindowSize();

  useEffect(() => {
    const getBreakpoint =
      Number(width) < mq.sm
        ? 'xs'
        : Number(width) < mq.md
        ? 'sm'
        : Number(width) < mq.lg
        ? 'md'
        : Number(width) < mq.xl
        ? 'lg'
        : Number(width) < mq.wd
        ? 'xl'
        : Number(width) > mq.wd
        ? 'wd'
        : 'xs';

    setBreakpoint(getBreakpoint);
  }, [width]);

  return breakpoint;
};
