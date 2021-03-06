import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import MasonryCustomSection from '@templates/MasonryCustomSection';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import UserInfoHeader from '@templates/UserInfoHeader';
import { getSearchParams } from '@core/middleware/apiSearchCalls';

const ModalPhoto = dynamic(() => import('@templates/ModalPhoto'), {
  ssr: false,
});

const getUser = (user?: string | string[]) => String(user)?.replace('@', '');

const UserPhotos = ({
  userInfo,
  photos,
  searchListData,
}: PageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper searchListData={searchListData}>
      <UserInfoHeader userInfo={userInfo} />
      <MasonryCustomSection
        photos={photos}
        url={`/users/${getUser(router.query.user)}/photos`}
      />
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data: userInfo } = await unsplash.get(
    `/napi/users/${getUser(params?.user)}`,
  );
  const { data: photos } = await unsplash.get(
    `/napi/users/${getUser(params?.user)}/photos`,
    {
      params: {
        page: 1,
        per_page: 12,
      },
    },
  );
  const { data: searchListData } = await getSearchParams();

  return { props: { userInfo, photos, searchListData } };
};

export default UserPhotos;
