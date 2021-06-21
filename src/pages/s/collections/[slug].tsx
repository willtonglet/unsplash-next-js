import { GetServerSideProps } from 'next';
import { unsplash } from '@core/middleware/api';
import PageWrapperWithSearch from '@templates/PageWrapperWithSearch';

const SlugTabPhotos = ({ results, photos }: PageProps): React.ReactElement => {
  return (
    <PageWrapperWithSearch results={results} photos={photos}>
      oi
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
    },
  });
  const { data: users } = await unsplash.get(`/napi/search/users`, {
    params: {
      query: query.slug,
      page: 1,
      per_page: 12,
    },
  });

  return {
    props: {
      collections: collections.results,
      photos: photos.results,
      results: {
        photos: photos.total,
        collections: collections.total,
        users: users.total,
      },
    },
  };
};

export default SlugTabPhotos;
