import React from 'react';
import PageWrapper from '@templates/PageWrapper';
import SearchTabs from '@components/SearchTabs';
import SearchHeader from '@templates/SearchHeader';

interface PageWrapperWithSearchProps {
  children?: React.ReactNode;
  photos: ImageProps[];
  results: ResultsProps;
  searchListData?: SearchListDataParams;
}

const PageWrapperWithSearch = ({
  children,
  photos,
  results,
  searchListData,
}: PageWrapperWithSearchProps): React.ReactElement => {
  return (
    <PageWrapper results={results} searchListData={searchListData}>
      <SearchTabs results={results} />
      <SearchHeader photos={photos} />
      {children}
    </PageWrapper>
  );
};

export default PageWrapperWithSearch;
