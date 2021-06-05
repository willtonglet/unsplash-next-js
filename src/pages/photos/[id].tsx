import { GetServerSideProps } from 'next';
import { unsplash } from '@core/middleware/api';
import PhotoContent from '@templates/PhotoContent';
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
    <>
      <PhotoContent image={image} />
      <SimpleMasonry photos={photos} />
      <ModalPhoto isOpen={router.query.id !== image.id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: image } = await unsplash.get(`/napi/photos/${query.id}`);
  const { data: photos } = await unsplash.get(
    `/napi/photos/${query.id}/related`,
  );
  return { props: { image, photos: photos.results } };
};

export default Photos;
