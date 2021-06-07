import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySectionTopics from '@templates/MasonrySectionTopics';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';

const TopicTabPhotos = ({ photos, topics }: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper topics={topics}>
      <MasonrySectionTopics photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: photos } = await unsplash.get(
    `/napi/topics/${String(query.slug)}/photos`,
    {
      params: {
        page: 1,
        per_page: 30,
      },
    },
  );
  const { data: topics } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 25,
    },
  });

  return { props: { photos, topics } };
};

export default TopicTabPhotos;
