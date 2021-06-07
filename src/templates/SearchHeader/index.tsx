import { useRouter } from 'next/router';
import ContainerWrapper from '@components/ContainerWrapper';

const SearchHeader = (): JSX.Element => {
  const router = useRouter();
  return (
    <ContainerWrapper className="pt-12">
      <h2 className="capitalize text-5xl font-bold">{router.query.slug}</h2>
    </ContainerWrapper>
  );
};

export default SearchHeader;
