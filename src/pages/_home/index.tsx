import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { unsplash } from '@core/middleware/api';
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

export const getStaticProps: GetStaticProps = async () => {
  const { data: topics } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 25,
    },
  });

  const { data: trends } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 5,
      order_by: 'featured',
    },
  });

  const { data: photos } = await unsplash.get('/napi/photos');

  return {
    props: {
      trends,
      topics,
      photos,
    },
  };
};

export default HomePage;
