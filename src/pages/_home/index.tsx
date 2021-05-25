import { GetStaticProps } from 'next';
import Head from 'next/head';
import { api } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import InfiniteScrollMasonry from '@templates/InfiniteScrollMasonry';

const HomePage = ({ topics, trends }: PageProps): JSX.Element => {
  return (
    <PageWrapper topics={topics}>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <MainCover trends={trends} />
      <ModalPhoto />
      <section className="bg-gray-50 py-12">
        <InfiniteScrollMasonry getUrl="/photos" />
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: topicsData } = await api.get('/topics', {
    params: {
      per_page: 25,
    },
  });

  const { data: trendsData } = await api.get('/topics', {
    params: {
      per_page: 5,
      order_by: 'featured',
    },
  });

  return {
    props: {
      trends: trendsData,
      topics: topicsData,
    },
  };
};

export default HomePage;
