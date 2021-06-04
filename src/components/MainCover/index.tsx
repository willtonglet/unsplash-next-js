import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IoIosSearch } from 'react-icons/io';
import { apiRoute } from '@core/middleware/api';
import ImageWithPreview from '../ImageWithPreview';
import useOnClickOutside from '@hooks/useOnClickOutside';

export interface MainCoverProps {
  trends?: { title: string; id: string }[];
}

const MainCover = (props: MainCoverProps): JSX.Element => {
  const { trends } = props;
  const [cover, setCover] = useState<ImageProps>();
  const [searchResults, setSearchResults] = useState<AutoCompleteParams>([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const { data } = await apiRoute.get('/photos/day');
    setCover(data);
  };

  const getSearch = async (word: string) => {
    const { data } = await apiRoute.get(`/search/${word}`);
    setSearchResults(data.autocomplete);
  };

  const renderSearchResults = searchResults?.map((result, index) => (
    <Link href="/" key={index}>
      <a className="text-sm text-gray-800 p-3 d-block hover:bg-gray-100">
        {result.query}
      </a>
    </Link>
  ));

  const handleClickOutside = () => {
    setIsSearchResultsOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (search) {
      getSearch(search);
      setIsSearchResultsOpen(true);
    } else {
      setIsSearchResultsOpen(false);
    }
  }, [search]);

  useOnClickOutside(searchRef, handleClickOutside);

  return (
    <section className="text-white grid grid-cols-1 grid-rows-1 aspect-w-16 aspect-h-9 xl:aspect-h-6">
      <div className="col-start-1 row-start-1 overflow-hidden">
        {cover && (
          <ImageWithPreview
            src={cover.urls.full}
            hash={cover.blur_hash}
            alt={cover.alt_description}
            width={cover.width}
            height={cover.height}
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
            <div className="relative">
              <div className="flex rounded shadow-md">
                <button
                  type="button"
                  className="h-14 bg-white text-gray-500 pl-3 rounded-l focus:outline-none"
                >
                  <IoIosSearch size={24} />
                </button>
                <input
                  type="text"
                  className="text-gray-800 w-full px-2 text-sm h-14 rounded-r focus:outline-none"
                  placeholder="Search free-high resolution photos"
                  onFocus={() => search && setIsSearchResultsOpen(true)}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {isSearchResultsOpen && searchResults.length > 0 && (
                <div
                  ref={searchRef}
                  className="absolute w-full bg-white shadow-md rounded flex flex-col py-2 mt-1"
                >
                  {renderSearchResults}
                </div>
              )}
            </div>
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
