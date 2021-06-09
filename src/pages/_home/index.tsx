import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { unsplash } from '@core/middleware/api';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import PageWrapper from '@templates/PageWrapper';

const MasonrySection = dynamic(() => import('@templates/MasonrySection'), {
  ssr: false,
});

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
      <MasonrySection photos={photos} />
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
  };
};

export default HomePage;
