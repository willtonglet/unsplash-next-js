import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

export function useBreakPoint(): string {
  const [breakpoint, setBreakpoint] = useState('');
  const xs = useMediaQuery('xs');
  const sm = useMediaQuery('sm');
  const md = useMediaQuery('md');
  const lg = useMediaQuery('lg');
  const xl = useMediaQuery('xl');
  const wd = useMediaQuery('wd');

  useEffect(() => {
    xs && setBreakpoint('xs');
    sm && setBreakpoint('sm');
    md && setBreakpoint('md');
    lg && setBreakpoint('lg');
    xl && setBreakpoint('xl');
    wd && setBreakpoint('wd');
  }, [xs, sm, md, lg, xl, wd]);

  return breakpoint;
}
