import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { unsplash } from '@core/middleware/api';
import { useRouter } from 'next/router';
import PhotoContent from '@templates/PhotoContent';
import SimpleMasonry from '@templates/SimpleMasonry';
import PageWrapper from '@templates/PageWrapper';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const Photos = ({ cover, photos }: PageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper>
      <PhotoContent image={cover} />
      <SimpleMasonry photos={photos} />
      <ModalPhoto isOpen={router.query.id !== cover.id} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: cover } = await unsplash.get(`/napi/photos/${query.id}`);
  const { data: photos } = await unsplash.get(
    `/napi/photos/${query.id}/related`,
  );
  return { props: { cover, photos: photos.results } };
};

export default Photos;
