import { useRouter } from 'next/router';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySectionTopics from '@templates/MasonrySectionTopics';

const TopicTabPhotos = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <MasonrySectionTopics />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </>
  );
};

export default TopicTabPhotos;
