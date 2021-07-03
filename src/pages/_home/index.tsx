import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import MainCover from '@components/MainCover';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import MasonryCustomSection from '@templates/MasonryCustomSection';
import { getSearchParams } from '@core/middleware/apiSearchCalls';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const HomePage = ({
  photos,
  cover,
  trends,
  topics,
  searchListData,
}: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper topics={topics} searchListData={searchListData}>
      <MainCover
        cover={cover}
        trends={trends}
        searchListData={searchListData}
      />
      <MasonryCustomSection url="/photos" photos={photos} />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: photos } = await unsplash.get('/napi/photos', {
    params: {
      page: 1,
      per_page: 12,
    },
  });
  const { data: cover } = await unsplash.get('/napi/photos/day');
  const { data: trends } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 5,
      order_by: 'featured',
    },
  });
  const { data: topics } = await unsplash.get('/napi/topics', {
    params: {
      per_page: 15,
    },
  });
  const { data: searchListData } = await getSearchParams();

  return {
    props: { photos, cover, trends, topics, searchListData },
  };
};

export default HomePage;
