import React from 'react';
import PageWrapper from '@templates/PageWrapper';
import SearchTabs from '@components/SearchTabs';
import SearchHeader from '@templates/SearchHeader';

interface PageWrapperWithSearchProps {
  children?: React.ReactNode;
  photos: ImageProps[];
  results: PageProps['results'];
}

const PageWrapperWithSearch = ({
  children,
  photos,
  results,
}: PageWrapperWithSearchProps): React.ReactElement => {
  return (
    <PageWrapper>
      <SearchTabs results={results} />
      <SearchHeader photos={photos} />
      {children}
    </PageWrapper>
  );
};

export default PageWrapperWithSearch;
