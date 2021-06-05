import { useRouter } from 'next/router';
import MainCover from '@components/MainCover';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySection from '@templates/MasonrySection';

const HomePage = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <MainCover />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
      <MasonrySection />
    </>
  );
};

export default HomePage;
