import SearchBar from '@components/SearchBar';
// import CoverPicture from '@components/CoverPicture';
import UserInfoPopover from '@components/UserInfoPopover';
import ImageWithPreview from '@components/ImageWithPreview';

interface MainCoverProps {
  cover: ImageProps;
  trends: { title: string; id: string }[];
}

const MainCover = ({ cover, trends }: MainCoverProps): React.ReactElement => {
  return (
    <section
      className="text-white relative flex"
      style={{ backgroundColor: cover.color }}
    >
      <ImageWithPreview
        src={cover.urls.full}
        width={cover.width}
        height={cover.height}
        alt={cover.alt_description}
        hash={cover.blur_hash}
        color={cover.color}
        layout="responsive"
        className="flex-grow"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full z-20">
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
          <div className="hidden md:flex justify-between text-sm text-gray-500 p-5">
            <div className="font-light">
              <span className="text-gray-300">Photo of the Day</span> by{' '}
              <UserInfoPopover user={cover.user} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCover;
