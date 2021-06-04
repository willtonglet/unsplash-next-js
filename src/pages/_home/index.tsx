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
        <title>Beautiful Free Images &amp; Pictures | Unsplash</title>
      </Head>
      <MainCover />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
      <MasonrySection />
    </PageWrapper>
  );
};

export default HomePage;
