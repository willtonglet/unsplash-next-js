import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { unsplash } from '@core/middleware/api';
import { useRouter } from 'next/router';
import PhotoContent from '@templates/PhotoContent';
import SimpleMasonry from '@templates/SimpleMasonry';
import PageWrapper from '@templates/PageWrapper';
import { getSearchParams } from '@core/middleware/apiSearchCalls';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const Photos = ({
  cover,
  photos,
  searchListData,
}: PageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper searchListData={searchListData}>
      <PhotoContent image={cover} />
      <SimpleMasonry photos={photos} />
      <ModalPhoto isOpen={router.query.id !== cover.id} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data: cover } = await unsplash.get(`/napi/photos/${query.id}`);
  const { data: photos } = await unsplash.get(
    `/napi/photos/${query.id}/related`,
  );
  const { data: searchListData } = await getSearchParams();

  return { props: { cover, photos: photos.results, searchListData } };
};

export default Photos;
