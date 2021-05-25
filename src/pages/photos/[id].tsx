import { GetServerSideProps } from 'next';
import { api } from '@core/middleware/api';
import PhotoContent from '@templates/PhotoContent';
import PageWrapper from '@templates/PageWrapper';
import CommonMasonry from '@templates/CommonMasonry';
import ModalPhoto from '@templates/ModalPhoto';

interface PhotoPageProps {
  image: ImageProps;
}

const Photos = ({ image }: PhotoPageProps): JSX.Element => {
  return (
    <PageWrapper>
      <PhotoContent image={image} />
      <CommonMasonry
        getUrl={`/collections/${image?.related_collections.results[0].id}/photos`}
      />
      <ModalPhoto />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: image } = await api.get(`/photos/${context.query.id}`);
  return { props: { image } };
};

export default Photos;
