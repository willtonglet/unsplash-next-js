import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import { apiRoute } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import TopicHeader from '@templates/TopicHeader';
import MasonryCustomSection from '@templates/MasonryCustomSection';

const TopicTabPhotos = ({
  photos,
  topics,
  topicInfo,
}: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper topics={topics}>
      <TopicHeader topicInfo={topicInfo} />
      <MasonryCustomSection
        url={`/topics/${String(router.query.slug)}/photos`}
        queryToBeListened={router.query.slug}
        photos={photos}
      />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: topicInfo } = await apiRoute.get(
    `/topics/${String(query.slug)}`,
  );
  const { data: photos } = await apiRoute.get(
    `/topics/${String(query.slug)}/photos`,
    {
      params: {
        page: 1,
        per_page: 12,
      },
    },
  );
  const { data: topics } = await apiRoute.get('/topics', {
    params: {
      per_page: 15,
    },
  });

  return { props: { photos, topics, topicInfo } };
};

export default TopicTabPhotos;
