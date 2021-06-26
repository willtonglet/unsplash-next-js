import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { apiRoute } from '@core/middleware/api';
import { slugify } from '@core/utils/slugify';

interface SearchBar {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  hasRoundedPill?: boolean;
  hasShadow?: boolean;
}

const SearchBar = (props: SearchBar): React.ReactElement => {
  const {
    variant = 'primary',
    size = 'small',
    hasRoundedPill = true,
    hasShadow = false,
  } = props;
  const [searchResults, setSearchResults] = useState<AutoCompleteParams>([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getSearch = async (word: string) => {
    const { data } = await apiRoute.get(`/search/${word}`);
    setSearchResults(data.fuzzy || data.did_you_mean || data.autocomplete);
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
      onClick={() => {
        router.push(`/s/photos/${slugify(result.query)}`);
        recentSearches
          ? setRecentSearches([...recentSearches, result.query])
          : setRecentSearches([result.query]);
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

  const handleFocus = () => {
    setIsSearchResultsOpen(true);
    setIsFocused(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router
      .push(`/s/photos/${search}`)
      .then(() =>
        recentSearches
          ? setRecentSearches([...recentSearches, search])
          : setRecentSearches([search]),
      );
    setIsSearchResultsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keyDown = 'ArrowDown';
    const keyUp = 'ArrowUp';
    const keyEnter = 'Enter';
    const keyEsc = 'Escape';
    if (e.key === keyDown)
      setSelectedIndex(
        selectedIndex < searchResults.length
          ? selectedIndex + 1
          : searchResults.length,
      );
    if (e.key === keyUp)
      setSelectedIndex(selectedIndex >= 0 ? selectedIndex - 1 : -1);
    if (e.key === keyEnter)
      setSearch(slugify(searchResults[selectedIndex].query));
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

  const renderResults =
    searchResults.length > 0 && search ? (
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
              <h4 className="text-sm mb-2 font-medium mr-1">Recent Searches</h4>
              ·
              <button
                type="button"
                className="text-sm text-gray-500 ml-1"
                onClick={() => setRecentSearches([])}
              >
                Clear
              </button>
            </div>
            <div className="flex">
              {recentSearches.map((search, i) => (
                <button
                  key={i}
                  onClick={() => router.push(`/s/photos/${slugify(search)}`)}
                  className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-1.5 mb-1.5"
                >
                  <span className="text-gray-500 text-sm">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div>
          <h4 className="text-sm mb-2 font-medium">Trending Searches</h4>
          <div className="flex">
            <button className="border border-gray-300 rounded py-2 px-4 bg-white flex items-center hover:bg-gray-100 mr-1 mb-1">
              <svg
                width="18"
                height="18"
                version="1.1"
                viewBox="0 0 32 32"
                aria-hidden="false"
                className="fill-current text-gray-500"
              >
                <path d="M21.2 8L24.177 11.0533L17.833 17.56L12.633 12.2267L3 22.12L4.833 24L12.633 16L17.833 21.3333L26.023 12.9467L29 16V8H21.2Z"></path>
              </svg>
              <span className="text-gray-500 text-sm ml-1.5">test</span>
            </button>
          </div>
        </div>
      </div>
    );

  useEffect(() => {
    if (search) getSearch(search);
  }, [search]);

  useEffect(() => {
    const recents = JSON.parse(
      localStorage.getItem('recent-searches') as string,
    ) as string[];
    setRecentSearches(recents);
  }, []);

  useEffect(() => {
    if (recentSearches && recentSearches.length > 0) {
      localStorage.setItem('recent-searches', JSON.stringify(recentSearches));
    } else {
      localStorage.removeItem('recent-searches');
    }
  }, [recentSearches]);

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
            className={`hidden md:block ${inputClasses}`}
            placeholder="Search free-high resolution photos"
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
      {isSearchResultsOpen && renderResults}
    </div>
  );
};

export default SearchBar;
