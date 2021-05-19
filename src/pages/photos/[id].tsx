import { GetServerSideProps } from 'next';
import api from '../../core/api';
import PhotoContent from '../../templates/PhotoContent';
import { ImageProps } from '../_home';

interface PhotoPageProps {
  image: ImageProps;
}

const Photos = ({ image }: PhotoPageProps) => {
  return <PhotoContent image={image} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: image } = await api.get(`/photos/${context.query.id}`);

  return { props: { image } };
};

export default Photos;
