import { GetServerSideProps } from 'next';
import { api } from '../../core/middleware/api';
import PhotoContent from '../../templates/PhotoContent';

interface PhotoPageProps {
  image: ImageProps;
}

const Photos = ({ image }: PhotoPageProps): JSX.Element => {
  return <PhotoContent image={image} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: image } = await api.get(`/photos/${context.query.id}`);

  return { props: { image } };
};

export default Photos;
