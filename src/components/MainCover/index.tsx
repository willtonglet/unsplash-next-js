import ImageWithPreview from '../ImageWithPreview';
import SearchBar from '@components/SearchBar';

interface MainCoverProps {
  cover: ImageProps;
  trends: { title: string; id: string }[];
}

const MainCover = ({ cover, trends }: MainCoverProps): React.ReactElement => {
  return (
    <section className="text-white grid grid-cols-1 grid-rows-1 aspect-w-16 bg-black aspect-h-9 xl:aspect-h-6">
      <div className="col-start-1 row-start-1 overflow-hidden">
        {cover && (
          <ImageWithPreview
            src={cover.urls.full}
            hash={cover.blur_hash}
            alt={cover.alt_description}
            width={cover.width}
            height={cover.height}
            color={cover.color}
            priority
            loading="eager"
          />
        )}
      </div>
      <div className="col-start-1 row-start-1 bg-opacity-50 bg-black w-screen flex flex-col justify-between z-10">
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col w-2/3">
            <h2 className="text-5xl font-bold mb-5">Unsplash</h2>
            <p className="text-lg font-light mb-7">
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </p>
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
        <div className="flex justify-between text-sm text-gray-400 p-5">
          <div className="font-light">
            <span className="text-white">Photo of the Day</span> by{' '}
            <span className="text-white">{cover?.user.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCover;
