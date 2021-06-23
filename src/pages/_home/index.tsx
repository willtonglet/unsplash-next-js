import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import MainCover from '@components/MainCover';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});
const MasonryCustomSection = dynamic(
  () => import('@templates/MasonryCustomSection'),
  {
    ssr: false,
  },
);

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
      <MasonryCustomSection url="/photos" photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: photos } = await unsplash.get('/napi/photos', {
    params: {
      page: 1,
      per_page: 12,
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
      per_page: 15,
    },
  });

  return {
    props: { photos, cover, trends, topics },
  };
};

export default HomePage;
