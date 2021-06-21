import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import MasonryCustomSection from '@templates/MasonryCustomSection';

const HomePage = ({
  photos,
  cover,
  trends,
  topics,
}: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper topics={topics}>
      <MainCover cover={cover} trends={trends} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
      <MasonryCustomSection url="/photos" photos={photos} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: photos } = await unsplash.get('/napi/photos', {
    params: {
      page: 1,
      per_page: 30,
    },
  });
  const { data: cover } = await unsplash.get('/napi/photos/day');
  const { data: trends } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 5,
      order_by: 'featured',
    },
  });
  const { data: topics } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 25,
    },
  });

  return {
    props: { photos, cover, trends, topics },
    revalidate: 60,
  };
};

export default HomePage;
