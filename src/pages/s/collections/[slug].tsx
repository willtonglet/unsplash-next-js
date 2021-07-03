import { GetServerSideProps } from 'next';
import { unsplash } from '@core/middleware/api';
import PageWrapperWithSearch from '@templates/PageWrapperWithSearch';
import MasonrySearchTabCollection from '@templates/MasonrySearchTabCollection';
import { getSearchParams } from '@core/middleware/apiSearchCalls';

const SlugTabPhotos = ({
  collections,
  results,
  photos,
  searchListData,
}: PageProps): React.ReactElement => {
  return (
    <PageWrapperWithSearch
      results={results}
      photos={photos}
      searchListData={searchListData}
    >
      <MasonrySearchTabCollection collections={collections} />
    </PageWrapperWithSearch>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: photos } = await unsplash.get(`/napi/search/photos`, {
    params: {
      query: query.slug,
      page: 1,
      per_page: 12,
    },
  });
  const { data: collections } = await unsplash.get(`/napi/search/collections`, {
    params: {
      query: query.slug,
      page: 1,
      per_page: 12,
      xp: '',
    },
  });
  const { data: users } = await unsplash.get(`/napi/search/users`, {
    params: {
      query: query.slug,
      page: 1,
      per_page: 12,
    },
  });
  const { data: searchListData } = await getSearchParams();

  return {
    props: {
      collections: collections.results,
      photos: photos.results,
      results: {
        photos: photos.total,
        collections: collections.total,
        users: users.total,
      },
      searchListData,
    },
  };
};

export default SlugTabPhotos;
