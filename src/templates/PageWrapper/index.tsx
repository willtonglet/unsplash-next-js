import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';

interface PageWrapperProps {
  children?: React.ReactNode;
  topics?: { title: string; slug: string; id: string }[];
}

const PageWrapper = ({
  children,
  topics,
}: PageWrapperProps): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Beautiful Free Images &amp; Pictures | Unsplash</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header topics={topics} />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </>
  );
};

export default PageWrapper;
