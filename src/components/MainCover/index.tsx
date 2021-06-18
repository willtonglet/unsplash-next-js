import SearchBar from '@components/SearchBar';
import CoverPicture from '@components/CoverPicture';
import UserInfoPopover from '@components/UserInfoPopover';

interface MainCoverProps {
  cover: ImageProps;
  trends: { title: string; id: string }[];
}

const MainCover = ({ cover, trends }: MainCoverProps): React.ReactElement => {
  return (
    <section className="text-white grid grid-cols-1 grid-rows-1 bg-black">
      <div className="col-start-1 row-start-1">
        <CoverPicture src={cover.urls.raw} alt={cover.alt_description} />
      </div>
      <div className="col-start-1 row-start-1 bg-opacity-50 bg-black w-screen flex flex-col justify-between z-10">
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col w-full px-3 sm:px-0 sm:w-2/3">
            <h2 className="text-2xl sm:text-5xl font-bold mb-5">Unsplash</h2>
            <p className="text-md sm:text-lg font-light mb-7">
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </p>
            <div className="hidden sm:block">
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
        <div className="hidden sm:flex justify-between text-sm text-gray-500 p-5">
          <div className="font-light">
            <span className="text-gray-300">Photo of the Day</span> by{' '}
            <UserInfoPopover user={cover.user} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCover;
