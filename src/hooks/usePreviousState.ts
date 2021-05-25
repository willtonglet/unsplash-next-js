import React from 'react';

export function usePreviousState<T>(data: T): React.MutableRefObject<unknown> {
  const ref: React.MutableRefObject<unknown> = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current as React.MutableRefObject<unknown>;
}
