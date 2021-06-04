import React, { ReactNode } from 'react';
import Head from 'next/head';
import { ModalContextProvider } from '@components/Modal/ModalContext';
import { PhotosContextProvider } from '@contexts/PhotosContext';
import TopicsNav from '@components/TopicsNav';

interface PageWrapperProps {
  children?: ReactNode;
}

const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { children } = props;
  return (
    <PhotosContextProvider>
      <ModalContextProvider>
        <Head>
          <title>Hello</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header className="sticky z-20 bg-white top-0 w-screen shadow-md">
          <TopicsNav />
        </header>
        <main>{children}</main>
      </ModalContextProvider>
    </PhotosContextProvider>
  );
};

export default PageWrapper;
