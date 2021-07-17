import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import { SearchStorageProvider } from '@components/SearchBar/SearchStorageContext';

interface PageWrapperProps {
  children?: React.ReactNode;
  topics?: { title: string; slug: string; id: string }[];
  results?: ResultsProps;
  searchListData?: SearchListDataParams;
  backgroundColor?: 'bg-gray-50' | 'bg-white';
}

const PageWrapper = ({
  children,
  topics,
  results,
  searchListData,
  backgroundColor = 'bg-gray-50',
}: PageWrapperProps): React.ReactElement => {
  return (
    <SearchStorageProvider results={results}>
      <Head>
        <title>Beautiful Free Images &amp; Pictures | Unsplash</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          data-react-helmet="true"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://unsplash.com/favicon-32x32.png"
        />
        <link
          data-react-helmet="true"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://unsplash.com/favicon-16x16.png"
        />
      </Head>
      <Header
        topics={topics}
        results={results}
        searchListData={searchListData}
      />
      <main className={`min-h-screen ${backgroundColor}`}>{children}</main>
    </SearchStorageProvider>
  );
};

export default PageWrapper;
