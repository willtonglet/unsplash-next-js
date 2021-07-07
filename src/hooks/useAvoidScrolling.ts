import { useEffect } from 'react';

export function useAvoidScrolling(value: boolean): void {
  useEffect(() => {
    if (value) document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [value]);
}
