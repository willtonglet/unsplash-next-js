import { useRouter } from 'next/router';
import Link from 'next/link';
import ContainerWrapper from '@components/ContainerWrapper';
import NavigationScroller from '@components/NavigationScroller';
import useMediaQuery from '@hooks/useMediaQuery';
import { slugify } from '@core/utils/slugify';

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
    <ContainerWrapper className="pt-14">
      <h2 className="capitalize text-5xl font-bold mb-6">
        {String(slug).replace('-', ' ')}
      </h2>
      {isMd && (
        <NavigationScroller backgroundColor="secondary" className="mb-4">
          {tagsArr.map((tag, index) => (
            <div key={index} className="pr-2">
              <div className="rounded border w-36 text-center border-gray-300 hover:border-gray-400">
                <Link href={`/s/photos/${slugify(String(tag))}`}>
                  <a className="text-gray-500 block text-sm p-2.5 whitespace-nowrap font-medium focus:outline-none capitalize hover:text-gray-600">
                    {tag}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </NavigationScroller>
      )}
    </ContainerWrapper>
  );
};

export default SearchHeader;
