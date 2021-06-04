import Head from 'next/head';
import { useRouter } from 'next/router';
import PageWrapper from '@templates/PageWrapper';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySection from '@templates/MasonrySection';

const HomePage = (): JSX.Element => {
  const router = useRouter();
  return (
    <PageWrapper>
      <Head>
        <title>Home | Next.js + TypeScript Example</title>
      </Head>
      <MainCover />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
      <section className="bg-gray-50 py-12">
        <MasonrySection getUrl="/photos" />
      </section>
    </PageWrapper>
  );
};

export default HomePage;
