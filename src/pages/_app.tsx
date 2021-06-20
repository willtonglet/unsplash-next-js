import React, { useEffect } from 'react';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { ModalContextProvider } from '@components/Modal/ModalContext';
import { PhotosContextProvider } from '@contexts/PhotosContext';
import 'tailwindcss/tailwind.css';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  useEffect(() => {
    if (typeof window !== 'undefined')
      window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <PhotosContextProvider>
      <ModalContextProvider>
        <Component {...pageProps} />
      </ModalContextProvider>
    </PhotosContextProvider>
  );
}
