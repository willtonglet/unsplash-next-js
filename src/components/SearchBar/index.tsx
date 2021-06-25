import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
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
      className="flex text-sm text-gray-800 p-3 d-block hover:bg-gray-100 focus:outline-none"
      onClick={() => {
        router.push(`/s/photos/${slugify(result.query)}`);
        setSearch('');
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
    search && setIsSearchResultsOpen(true);
    setIsFocused(true);
  };

  const inputClasses = `text-gray-800 w-full px-2 text-sm ${handleHeight} ${handleBackground} ${handleRadius(
    'r',
  )} ${
    variant === 'primary' && isFocused
      ? 'border-r border-t border-b border-gray-300'
      : ''
  } focus:outline-none`;

  useEffect(() => {
    if (search) {
      getSearch(search);
      setIsSearchResultsOpen(true);
    } else {
      setIsSearchResultsOpen(false);
    }
  }, [search]);

  return (
    <div className="relative">
      <div className={`flex rounded ${hasShadow ? 'shadow-md' : ''} relative`}>
        <button
          type="button"
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
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
      {isSearchResultsOpen && searchResults.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchBar;
