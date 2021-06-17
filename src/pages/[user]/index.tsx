import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import MasonryCustomSection from '@templates/MasonryCustomSection';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';
import UserInfoHeader from '@templates/UserInfoHeader';

const getUser = (user?: string | string[]) => String(user)?.replace('@', '');

const UserPhotos = ({ userInfo, photos }: PageProps): React.ReactElement => {
  const router = useRouter();
  return (
    <PageWrapper>
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
        per_page: 30,
      },
    },
  );

  return { props: { userInfo, photos } };
};

export default UserPhotos;
