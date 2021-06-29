import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import MasonrySearchTabPhotos from '@templates/MasonrySearchTabPhotos';
import { unsplash } from '@core/middleware/api';
import PageWrapperWithSearch from '@templates/PageWrapperWithSearch';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const SlugTabPhotos = ({ results, photos }: PageProps): React.ReactElement => {
  const router = useRouter();
  console.log(results.photos);
  return (
    <PageWrapperWithSearch results={results} photos={photos}>
      <MasonrySearchTabPhotos photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
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
