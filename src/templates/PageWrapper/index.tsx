import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AppContextProvider } from '../../contexts/AppContext';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) {
      document.body.classList.remove('no-scroll');
    }
  }, [router.query.id]);

  return (
    <AppContextProvider>
      <Head>
        <title>Hello</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
    </AppContextProvider>
  );
};

export default PageWrapper;
