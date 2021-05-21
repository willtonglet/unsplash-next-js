function noop(): void {
  return;
}

export const mockMediaQueryList: MediaQueryList = {
  media: '',
  matches: false,
  onchange: noop,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatchEvent: (_: Event) => true,
};

export const mqs = {
  xs: '(min-width: 0px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  wd: '(min-width: 1536px)',
};
