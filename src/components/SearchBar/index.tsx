import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { apiRoute } from '@core/middleware/api';
import SearchData from './SearchData';

export interface SearchBarProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  hasRoundedPill?: boolean;
  hasShadow?: boolean;
  results?: ResultsProps;
  searchListData?: SearchListDataParams;
}

const SearchBar = (props: SearchBarProps): React.ReactElement => {
  const {
    variant = 'primary',
    size = 'small',
    hasRoundedPill = true,
    hasShadow = false,
    results,
    searchListData,
  } = props;
  const [searchResults, setSearchResults] = useState<AutoCompleteParams>([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
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

  const sendSearchTerm = () =>
    apiRoute.post(
      '/search/popular-words',
      {
        word: router.query.slug,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

  useEffect(() => {
    if (results && results.photos > 0) sendSearchTerm();
  }, [results]);

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
        router.push(`/s/photos/${result.query}`);
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
    router.push(`/s/photos/${search}`);
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
      selectedIndex > -1 &&
      selectedIndex < searchResults.length
    )
      setSearch(searchResults[selectedIndex].query);

    if (e.key === keyEsc) {
      setSelectedIndex(-1);
      setIsSearchResultsOpen(false);
    }
  };

  const inputClasses = `text-gray-500 w-full px-2 text-sm ${handleHeight} ${handleBackground} ${handleRadius(
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

  useEffect(() => {
    if (router.query.slug && router.pathname === '/s/photos/[slug]') {
      setSearch(router.query.slug as string);
      setIsSearchResultsOpen(false);
    }
  }, [router.query.slug, router.pathname]);

  const renderInput = (mq: 'sm' | 'md') => (
    <input
      type="text"
      className={`${
        mq === 'md' ? 'hidden md:block' : 'md:hidden'
      } ${inputClasses}`}
      placeholder={
        mq === 'sm' ? 'Search photos' : 'Search free-high resolution photos'
      }
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value.trimStart());
        setIsSearchResultsOpen(true);
      }}
      ref={inputRef}
      required
    />
  );

  const renderSearchOptions = search ? (
    renderResults
  ) : (
    <SearchData
      searchRef={searchRef}
      searchListData={searchListData}
      variant={variant}
      hasShadow={hasShadow}
    />
  );

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
          {renderInput('md')}
          {renderInput('sm')}
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
