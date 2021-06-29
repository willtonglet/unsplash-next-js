import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { apiRoute } from '@core/middleware/api';
import { slugify } from '@core/utils/slugify';
import ImageWithPreview from '@components/ImageWithPreview';

export interface SearchBarProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  hasRoundedPill?: boolean;
  hasShadow?: boolean;
  results?: ResultsProps;
}

const SearchBar = (props: SearchBarProps): React.ReactElement => {
  const {
    variant = 'primary',
    size = 'small',
    hasRoundedPill = true,
    hasShadow = false,
    results,
  } = props;
  const [searchResults, setSearchResults] = useState<AutoCompleteParams>([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TopicProps[]>([]);
  const [trendingCollections, setTrendingCollections] = useState<
    CollectionProps[]
  >([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { slug } = router.query;
  const { pathname } = router;

  const getSearch = async (word: string) => {
    const { data } = await apiRoute.get(`/search/${word}`);
    setSearchResults(data.fuzzy || data.did_you_mean || data.autocomplete);
  };

  const getTopics = async () => {
    const { data } = await apiRoute.get(`/topics`, {
      params: {
        orderBy: 'popular',
        per_page: 5,
      },
    });
    setTrendingTopics(data);
  };

  const getCollections = async () => {
    const { data } = await apiRoute.get(`/collections`, {
      params: {
        orderBy: 'popular',
        per_page: 5,
      },
    });
    setTrendingCollections(data);
  };

  const handleHeight = size === 'small' ? 'h-10' : 'h-14';
  const handleBackground =
    variant === 'primary'
      ? isFocused
        ? 'bg-white'
        : 'bg-gray-300 bg-opacity-50' || 'bg-gray-300 bg-opacity-50'
      : 'bg-white';

  const handleRadius = (side: 'l' | 'r') =>
    side === 'l'
      ? hasRoundedPill
        ? `rounded-l-full`
        : `rounded-l`
      : hasRoundedPill
      ? `rounded-r-full`
      : `rounded-r`;

  const renderSearchResults = searchResults?.map((result, index) => (
    <button
      key={index}
      className={`${
        selectedIndex === index ? 'bg-gray-100 ' : ''
      }flex text-sm text-gray-800 p-3 d-block hover:bg-gray-100 focus:outline-none`}
      onMouseEnter={() => setSelectedIndex(-1)}
      onClick={() => {
        router.push(`/s/photos/${slugify(result.query)}`);
        setIsSearchResultsOpen(false);
        setSearch(result.query);
      }}
    >
      {result.query}
    </button>
  ));

  const handleClickOutsideResults = () => setIsSearchResultsOpen(false);
  const handleClickOutsideInput = () => setIsFocused(false);

  useOnClickOutside(searchRef, handleClickOutsideResults);
  useOnClickOutside(inputRef, handleClickOutsideInput);

  const handleFocus = () => setIsSearchResultsOpen(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchResultsOpen(false);

    router.push(`/s/photos/${slugify(search)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keyDown = 'ArrowDown';
    const keyUp = 'ArrowUp';
    const keyEnter = 'Enter';
    const keyEsc = 'Escape';
    if (e.key === keyDown)
      setSelectedIndex(
        selectedIndex < searchResults.length ? selectedIndex + 1 : 0,
      );
    if (e.key === keyUp)
      setSelectedIndex(
        selectedIndex >= 0 ? selectedIndex - 1 : searchResults.length - 1,
      );
    if (
      e.key === keyEnter &&
      (selectedIndex > -1 || selectedIndex < searchResults.length - 1)
    ) {
      setSearch(searchResults[selectedIndex].query);
    }
    if (e.key === keyEsc) {
      setSelectedIndex(-1);
      setIsSearchResultsOpen(false);
    }
  };

  const inputClasses = `text-gray-800 w-full px-2 text-sm ${handleHeight} ${handleBackground} ${handleRadius(
    'r',
  )} ${
    variant === 'primary' && isFocused
      ? 'border-r border-t border-b border-gray-300'
      : ''
  } focus:outline-none`;

  const renderResults = (
    <>
      {searchResults.length > 0 ? (
        <div
          ref={searchRef}
          className={`absolute w-full bg-white z-20 ${
            hasShadow ? 'shadow-md' : ''
          } rounded flex flex-col py-2 mt-1 ${
            variant === 'primary' ? 'border border-gray-300' : ''
          }`}
        >
          {renderSearchResults}
        </div>
      ) : null}
    </>
  );

  const renderSearchOptions = search ? (
    renderResults
  ) : (
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
          <div className="flex items-baseline">
            <h4 className="text-sm mb-2 font-medium mr-1">Recent Searches</h4>·
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
                className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-2 mb-2"
              >
                <span className="text-gray-500 text-sm">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mb-5">
        <h4 className="text-sm mb-2 font-medium text-black">Trending Topics</h4>
        <div className="flex flex-wrap">
          {trendingTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => router.push(`/t/${slugify(topic.slug)}`)}
              className="border border-gray-300 rounded bg-white flex text-left items-center hover:bg-gray-100 mr-2 mb-2 overflow-hidden"
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
              <span className="text-gray-500 text-sm px-3 py-2 whitespace-nowrap">
                {topic.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm mb-2 font-medium text-black">
          Trending Collections
        </h4>
        <div className="flex flex-wrap">
          {trendingCollections.map((collection) => (
            <button
              key={collection.id}
              onClick={() =>
                router.push(
                  `/collections/${collection.id}/${slugify(
                    collection.title.toLowerCase(),
                  )}`,
                )
              }
              className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-2 mb-2"
            >
              <span className="text-gray-500 text-sm">{collection.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    getTopics();
    getCollections();
  }, []);

  useEffect(() => {
    const recents = JSON.parse(
      localStorage.getItem('recent-searches') as string,
    ) as string[];

    !recents && localStorage.setItem('recent-searches', JSON.stringify([]));

    if (
      slug &&
      recents &&
      results &&
      results.photos > 0 &&
      !recents.includes(slug as string)
    ) {
      setRecentSearches([...recents, slug as string]);
      localStorage.setItem(
        'recent-searches',
        JSON.stringify([...recents, slug as string]),
      );
    }

    setRecentSearches(recents);
  }, [slug, results]);

  useEffect(() => {
    if (search) getSearch(search);
  }, [search]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex rounded ${hasShadow ? 'shadow-md' : ''} relative`}
        >
          <button
            type="submit"
            aria-label="Search"
            onClick={() => inputRef.current?.focus()}
            className={`h-${handleHeight} ${handleBackground} text-gray-500 pl-3 ${handleRadius(
              'l',
            )} ${
              variant === 'primary' && isFocused
                ? 'border-l border-t border-b border-gray-300'
                : ''
            } focus:outline-none`}
          >
            <IoIosSearch size={size === 'small' ? 21 : 24} />
          </button>
          <input
            type="text"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            className={`hidden md:block ${inputClasses}`}
            placeholder="Search free-high resolution photos"
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsSearchResultsOpen(true);
            }}
            ref={inputRef}
            required
          />

          <input
            type="text"
            className={`md:hidden ${inputClasses}`}
            placeholder="Search photos"
            onFocus={handleFocus}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={inputRef}
          />
          {search && (
            <button
              className="text-gray-500 absolute top-1/2 transform -translate-y-1/2 right-2 focus:outline-none"
              onClick={() => setSearch('')}
            >
              <IoIosClose size={24} />
              <span className="hidden">Close</span>
            </button>
          )}
        </div>
      </form>
      {isSearchResultsOpen && renderSearchOptions}
    </div>
  );
};

export default SearchBar;
