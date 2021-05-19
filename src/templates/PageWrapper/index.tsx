import React, { ReactNode } from 'react';
import Head from 'next/head';
import { AppContextProvider } from '../../contexts/AppContext';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => (
  <AppContextProvider>
    <Head>
      <title>Hello</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{children}</main>
  </AppContextProvider>
);

export default PageWrapper;
