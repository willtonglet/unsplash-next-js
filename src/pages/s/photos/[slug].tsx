import { useRouter } from 'next/router';
import PageWrapper from '@templates/PageWrapper';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySearchTabPhotos from '@templates/MasonrySearchTabPhotos';

const SlugTabPhotos = (): JSX.Element => {
  const router = useRouter();

  return (
    <PageWrapper>
      <MasonrySearchTabPhotos />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export default SlugTabPhotos;
