import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ModalPhoto from '@templates/ModalPhoto';
import MasonrySectionTopics from '@templates/MasonrySectionTopics';
import { unsplash } from '@core/middleware/api';
import PageWrapper from '@templates/PageWrapper';

const UserPhotos = ({ photos }: PageProps): React.ReactElement => {
  const router = useRouter();

  return (
    <PageWrapper>
      <MasonrySectionTopics photos={photos} /> */
      <ModalPhoto isOpen={Boolean(router.query.id)} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const getUser = String(params?.user).replace('@', '');
  const { data: userInfo } = await unsplash.get(`/napi/users/${getUser}`);
  const { data: photos } = await unsplash.get(`/napi/users/${getUser}/photos`, {
    params: {
      page: 1,
      per_page: 30,
    },
  });

  return { props: { userInfo, photos } };
};

export default UserPhotos;
