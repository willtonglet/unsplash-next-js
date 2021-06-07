import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySearchTabPhotos from '@templates/MasonrySearchTabPhotos';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import SearchHeader from '@templates/SearchHeader';

const SlugTabPhotos = ({ photos }: PageProps): JSX.Element => {
  const router = useRouter();

  return (
    <PageWrapper>
      <SearchHeader />
      <MasonrySearchTabPhotos photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: photos } = await unsplash.get(`/napi/search/photos`, {
    params: {
      query: query.slug,
      page: 1,
      per_page: 30,
    },
  });
  return { props: { photos: photos.results } };
};

export default SlugTabPhotos;
