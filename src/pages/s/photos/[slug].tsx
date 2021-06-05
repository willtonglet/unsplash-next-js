import { useRouter } from 'next/router';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySearchTabPhotos from '@templates/MasonrySearchTabPhotos';

const SlugTabPhotos = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <MasonrySearchTabPhotos />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </>
  );
};

export default SlugTabPhotos;
