import { GetServerSideProps } from 'next';
import { unsplash } from '@core/middleware/api';
import PhotoContent from '@templates/PhotoContent';
import ModalPhoto from '@templates/ModalPhoto';
import { useRouter } from 'next/router';
import SimpleMasonry from '@templates/SimpleMasonry';
import PageWrapper from '@templates/PageWrapper';

interface PhotoPageProps extends PageProps {
  image: ImageProps;
}

const Photos = ({
  image,
  photos,
  topics,
}: PhotoPageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper topics={topics}>
      <PhotoContent image={image} />
      <SimpleMasonry photos={photos} />
      <ModalPhoto isOpen={router.query.id !== image.id} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: image } = await unsplash.get(`/napi/photos/${query.id}`);
  const { data: photos } = await unsplash.get(
    `/napi/photos/${query.id}/related`,
  );
  const { data: topics } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 25,
    },
  });
  return { props: { image, photos: photos.results, topics } };
};

export default Photos;
