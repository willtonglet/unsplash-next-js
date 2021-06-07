import React from 'react';
import App from 'next/app';
import { ModalContextProvider } from '@components/Modal/ModalContext';
import { PhotosContextProvider } from '@contexts/PhotosContext';
import '../styles/global.css';

export default class MyApp extends App {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <PhotosContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </PhotosContextProvider>
    );
  }
}
