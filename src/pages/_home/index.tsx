import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { apiRoute } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySection from '@templates/MasonrySection';

const HomePage = ({ topics, trends }: PageProps): JSX.Element => {
  const router = useRouter();
  return (
    <PageWrapper topics={topics}>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <MainCover trends={trends} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
      <section className="bg-gray-50 py-12">
        <MasonrySection getUrl="/photos" />
      </section>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: topics } = await apiRoute.get('/topics', {
    params: {
      per_page: 25,
    },
  });

  const { data: trends } = await apiRoute.get('/topics', {
    params: {
      per_page: 5,
      order_by: 'featured',
    },
  });

  return {
    props: {
      trends,
      topics,
    },
  };
};

export default HomePage;
