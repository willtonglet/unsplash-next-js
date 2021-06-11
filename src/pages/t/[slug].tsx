import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySectionTopics from '@templates/MasonrySectionTopics';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import TopicHeader from '@templates/TopicHeader';

const TopicTabPhotos = ({
  photos,
  topics,
  topicInfo,
}: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper topics={topics}>
      <TopicHeader topicInfo={topicInfo} />
      <MasonrySectionTopics photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: topicInfo } = await unsplash.get(
    `/napi/topics/${String(query.slug)}`,
  );
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

  return { props: { photos, topics, topicInfo } };
};

export default TopicTabPhotos;
