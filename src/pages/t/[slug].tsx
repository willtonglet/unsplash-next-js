import { useRouter } from 'next/router';
import PageWrapper from '@templates/PageWrapper';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySectionTopics from '@templates/MasonrySectionTopics';

const TopicTabPhotos = (): JSX.Element => {
  const router = useRouter();

  return (
    <PageWrapper>
      <MasonrySectionTopics />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export default TopicTabPhotos;
