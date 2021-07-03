import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { slugify } from '@core/utils/slugify';
import { unslugify } from '@core/utils/unslugify';
import { SearchBarProps } from '.';
import { SearchStorageContext } from './SearchStorageContext';
import SearchDataSkeleton from './SearchDataSkeleton';
import ImageWithPreview from '@components/ImageWithPreview';

export interface SearchDataProps {
  searchRef: React.RefObject<HTMLDivElement>;
  searchListData?: SearchListDataParams;
  hasShadow: SearchBarProps['hasShadow'];
  variant: SearchBarProps['variant'];
}

const SearchData = ({
  searchRef,
  hasShadow,
  variant,
  searchListData,
}: SearchDataProps): React.ReactElement => {
  const router = useRouter();
  const { recentSearches, setRecentSearches } =
    useContext(SearchStorageContext);

  return (
    <div
      ref={searchRef}
      className={`absolute px-4 py-5 w-full bg-white z-20 ${
        hasShadow ? 'shadow-md' : ''
      } rounded flex flex-col py-2 mt-1 ${
        variant === 'primary' ? 'border border-gray-300' : ''
      }`}
    >
      {recentSearches && recentSearches.length > 0 && (
        <div className="mb-5">
          <div className="flex items-baseline text-black">
            <h4 className="text-sm font-medium mr-1">Recent Searches</h4>·
            <button
              type="button"
              className="text-sm text-gray-500 ml-1"
              onClick={() => {
                localStorage.setItem('recent-searches', JSON.stringify([]));
                setRecentSearches([]);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap">
            {recentSearches.map((search, i) => (
              <button
                key={i}
                onClick={() => router.push(`/s/photos/${slugify(search)}`)}
                className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-2 mt-2"
              >
                <span className="text-gray-500 text-sm">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mb-5">
        <h4 className="text-sm font-medium text-black">Trending Searches</h4>
        <div className="flex flex-wrap">
          {searchListData && searchListData.popular.length > 0 ? (
            searchListData.popular.map((trend, index) => (
              <button
                key={index}
                onClick={() => router.push(`/s/photos/${slugify(trend)}`)}
                className="border border-gray-300 rounded bg-white py-2 px-3 flex text-left items-center hover:bg-gray-100 mr-2 mt-2 overflow-hidden"
              >
                <svg
                  width="18"
                  height="18"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className="mr-2 fill-current text-gray-400"
                >
                  <path d="M21.2 8L24.177 11.0533L17.833 17.56L12.633 12.2267L3 22.12L4.833 24L12.633 16L17.833 21.3333L26.023 12.9467L29 16V8H21.2Z"></path>
                </svg>
                <span className="text-gray-500 text-sm">
                  {unslugify(trend)}
                </span>
              </button>
            ))
          ) : (
            <SearchDataSkeleton />
          )}
        </div>
      </div>
      <div className="mb-5">
        <h4 className="text-sm font-medium text-black">Trending Topics</h4>
        <div className="flex flex-wrap">
          {searchListData && searchListData.topics.length > 0 ? (
            searchListData.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => router.push(`/t/${slugify(topic.slug)}`)}
                className="border border-gray-300 rounded bg-white flex text-left items-center hover:bg-gray-100 mr-2 mt-2 overflow-hidden"
              >
                <div className="h-10 w-10 relative">
                  <ImageWithPreview
                    hash={topic.cover_photo.blur_hash}
                    src={topic.cover_photo.urls.thumb}
                    color={topic.cover_photo.color}
                    alt={topic.title}
                    height={38}
                    width={38}
                    layout="responsive"
                  />
                </div>
                <span className="text-gray-500 text-sm px-3 py-2 whitespace-nowrap capitalize">
                  {topic.title}
                </span>
              </button>
            ))
          ) : (
            <SearchDataSkeleton />
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-black">Trending Collections</h4>
        <div className="flex flex-wrap">
          {searchListData && searchListData.collections.length > 0 ? (
            searchListData.collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() =>
                  router.push(
                    `/collections/${collection.id}/${slugify(
                      collection.title.toLowerCase(),
                    )}`,
                  )
                }
                className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-2 mt-2"
              >
                <span className="text-gray-500 text-sm capitalize">
                  {collection.title}
                </span>
              </button>
            ))
          ) : (
            <SearchDataSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchData;
