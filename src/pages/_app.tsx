import React from 'react';
import App from 'next/app';
import '../styles/global.css';
import PageWrapper from '@templates/PageWrapper';

export default class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    );
  }
}
