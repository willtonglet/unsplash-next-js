import { GetServerSideProps } from 'next';
import { apiRoute } from '@core/middleware/api';
import PhotoContent from '@templates/PhotoContent';
import PageWrapper from '@templates/PageWrapper';
import ModalPhoto from '@templates/ModalPhoto';
import { useRouter } from 'next/router';
import SimpleMasonry from '@templates/SimpleMasonry';

interface PhotoPageProps {
  image: ImageProps;
  photos: ImageProps[];
}

const Photos = ({ image, photos }: PhotoPageProps): JSX.Element => {
  const router = useRouter();
  return (
    <PageWrapper>
      <PhotoContent image={image} />
      <SimpleMasonry photos={photos} />
      <ModalPhoto isOpen={router.query.id !== image.id} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: image } = await apiRoute.get(`/photos/${query.id}`);
  const { data: photos } = await apiRoute.get(`/photos/${query.id}/related`);
  return { props: { image, photos: photos.results } };
};

export default Photos;
