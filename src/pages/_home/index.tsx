/* eslint-disable camelcase */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import api from '../../core/api';
import TopicsNav from '../../components/TopicsNav';
import PageWrapper from '../../templates/PageWrapper';
import MainCover from '../../components/MainCover';
import MasonrySection from '../../templates/MasonrySection';

export interface ImageProps {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    full: string;
  };
  width: number;
  height: number;
}
interface PageProps {
  topics: { title: string; id: string }[];
  cover: ImageProps;
}

const HomePage = ({ topics, cover }: PageProps) => {
  return (
    <PageWrapper>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <header className="sticky z-50 bg-white top-0 w-screen shadow-md">
        <TopicsNav topics={topics} />
      </header>
      <MainCover image={cover} />
      <MasonrySection />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: topicsData } = await api.get('/topics', {
    params: {
      per_page: 25,
    },
  });
  const { data: coverData } = await api.get('/photos/random', {
    params: {
      topics: 'bo8jQKTaE0Y',
      orientation: 'landscape',
    },
  });
  return {
    props: {
      topics: topicsData,
      cover: coverData,
    },
  };
};

export default HomePage;
