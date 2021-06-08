import { useRouter } from 'next/router';
import ContainerWrapper from '@components/ContainerWrapper';
import NavigationScroller from '@components/NavigationScroller';
import useMediaQuery from '@hooks/useMediaQuery';

interface SearchHeaderProps {
  photos: ImageProps[];
}

const SearchHeader = ({ photos }: SearchHeaderProps): React.ReactElement => {
  const router = useRouter();
  const { slug } = router.query;
  const isMd = useMediaQuery('md');

  const tagsArr = [
    ...new Set(
      photos
        .map((photo) => photo.tags.map((p) => p.title))
        .flat()
        .filter((t) => String(t) !== slug),
    ),
  ];

  return (
    <ContainerWrapper className="pt-12">
      <h2 className="capitalize text-5xl font-bold mb-8">
        {router.query.slug}
      </h2>
      {isMd && (
        <NavigationScroller
          backgroundColor="secondary"
          className="none md:block mb-4"
        >
          {tagsArr.map((tag, index) => (
            <button
              key={index}
              className="text-gray-500 mr-2 w-36 rounded border border-gray-300 text-sm py-2.5 px-3 font-medium focus:outline-none capitalize hover:border-gray-400 hover:text-gray-600"
              onClick={() => router.push(`/s/photos/${tag}`)}
            >
              {tag}
            </button>
          ))}
        </NavigationScroller>
      )}
    </ContainerWrapper>
  );
};

export default SearchHeader;
