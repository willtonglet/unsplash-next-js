import {
  useState,
  useEffect,
  useLayoutEffect,
  EffectCallback,
  DependencyList,
} from 'react';
import { mqs, mockMediaQueryList } from '@core/helpers/mqs';

export type Effect = (effect: EffectCallback, deps?: DependencyList) => void;
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'wd';

const createUseMedia =
  (effect: Effect) => (windowSize: Sizes, defaultState?: boolean) => {
    const [state, setState] = useState(defaultState || false);
    const query = mqs[windowSize];

    effect(() => {
      let mounted = true;
      const mediaQueryList: MediaQueryList =
        typeof window === 'undefined'
          ? mockMediaQueryList
          : window.matchMedia(query);

      const onChange = () => {
        if (!mounted) {
          return;
        }

        setState(Boolean(mediaQueryList.matches));
      };

      mediaQueryList.addEventListener('change', onChange);
      setState(mediaQueryList.matches);

      return () => {
        mounted = false;
        mediaQueryList.removeEventListener('change', onChange);
      };
    }, [query]);

    return state;
  };

export const useMediaQuery = createUseMedia(useEffect);
export const useMediaQueryLayout = createUseMedia(useLayoutEffect);

export default useMediaQuery;
