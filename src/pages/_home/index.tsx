import { GetStaticProps } from 'next';
import Head from 'next/head';
import { api } from '@core/middleware/api';
import TopicsNav from '@components/TopicsNav';
import PageWrapper from '@templates/PageWrapper';
import MainCover from '@components/MainCover';
import MasonrySection from '@templates/MasonrySection';
import ModalPhoto from '@templates/ModalPhoto';

const HomePage = ({ topics, trends }: PageProps): JSX.Element => {
  return (
    <PageWrapper>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <header className="sticky z-50 bg-white top-0 w-screen shadow-md">
        <TopicsNav topics={topics} />
      </header>
      <MainCover trends={trends} />
      <ModalPhoto />
      <MasonrySection getUrl="/photos" />
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
