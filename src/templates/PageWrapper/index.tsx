import React, { ReactNode } from 'react';
import Head from 'next/head';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => (
  <>
    <Head>
      <title>Hello</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{children}</main>
  </>
);

export default PageWrapper;
