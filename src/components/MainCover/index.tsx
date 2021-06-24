import Image from 'next/image';
import Link from 'next/link';
import BlurHash from '@components/BlurHash';
import SearchBar from '@components/SearchBar';
import UserInfoPopover from '@components/UserInfoPopover';
import { useContextualRouting } from '@hooks/useContextualRouting';

interface MainCoverProps {
  cover: ImageProps;
  trends: { title: string; id: string }[];
}

const MainCover = ({ cover, trends }: MainCoverProps): React.ReactElement => {
  const { makeContextualHref } = useContextualRouting();
  return (
    <section
      className="text-white relative"
      style={{ backgroundColor: cover.color }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={cover.urls.full}
          quality={80}
          layout="fill"
          objectFit="cover"
          className="relative z-10"
          priority
        />
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor: cover.color }}
        >
          <BlurHash hash={cover.blur_hash} height="100%" width="100%" />
        </div>
      </div>
      <div className="relative z-20">
        <div className="bg-opacity-40 bg-black w-full h-full">
          <div className="py-12 sm:py-24 md:py-36 flex justify-center">
            <div className="flex flex-col w-full px-3 md:px-0 md:w-2/3">
              <h2 className="text-2xl md:text-5xl font-bold mb-5">Unsplash</h2>
              <p className="text-md md:text-lg font-light mb-7">
                The internet’s source of freely-usable images.
                <br />
                Powered by creators everywhere.
              </p>
              <div className="hidden md:block">
                <SearchBar
                  hasShadow
                  hasRoundedPill={false}
                  variant="secondary"
                  size="medium"
                />
                <p className="text-sm mt-4">
                  Trending:{' '}
                  {trends?.map((trend, index) => (
                    <span
                      className="text-white text-gray-300 hover:text-white"
                      key={trend.id}
                    >
                      {trend.title}
                      {index + 1 < trends.length && ', '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-between text-sm text-gray-400 p-5">
            <div className="font-light">
              <Link
                href={makeContextualHref({ id: cover.id })}
                as={`/photos/${cover.id}`}
                shallow={true}
                key={cover.id}
                scroll={false}
              >
                <a className="zoom-in text-gray-200 hover:text-white">
                  Photo of the Day
                </a>
              </Link>{' '}
              by{' '}
              <UserInfoPopover user={cover.user}>
                <Link href={`/@${cover.user.username}`}>
                  <a className="text-gray-200 hover:text-white">
                    {cover.user.name}
                  </a>
                </Link>
              </UserInfoPopover>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCover;
