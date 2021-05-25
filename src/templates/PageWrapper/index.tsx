import React, { ReactNode } from 'react';
import Head from 'next/head';
import { ModalContextProvider } from '@components/Modal/ModalContext';
import { PhotosContextProvider } from '@contexts/PhotosContext';
import TopicsNav from '@components/TopicsNav';

interface PageWrapperProps {
  children?: ReactNode;
  topics?: { title: string; id: string }[];
}

const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { children, topics } = props;
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
        <header className="sticky z-50 bg-white top-0 w-screen shadow-md">
          {topics && <TopicsNav topics={topics} />}
        </header>
        <main>{children}</main>
      </ModalContextProvider>
    </PhotosContextProvider>
  );
};

export default PageWrapper;
