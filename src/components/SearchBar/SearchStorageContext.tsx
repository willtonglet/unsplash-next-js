import { useRouter } from 'next/router';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface SearchStorageProviderProps {
  results?: ResultsProps;
}

interface SearchStorageContextProps {
  recentSearches: string[];
  setRecentSearches: Dispatch<SetStateAction<string[]>>;
}

export const SearchStorageContext = createContext<SearchStorageContextProps>({
  recentSearches: [],
  setRecentSearches: () => null,
});

export const SearchStorageProvider: React.FC<SearchStorageProviderProps> = ({
  children,
  results,
}) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const recents = JSON.parse(
      localStorage.getItem('recent-searches') as string,
    ) as string[];

    setRecentSearches(recents);

    if (!recents) localStorage.setItem('recent-searches', JSON.stringify([]));

    if (
      slug &&
      recents &&
      results &&
      results.photos > 0 &&
      Boolean(!recents.includes(slug as string))
    ) {
      setRecentSearches([...recents, slug as string]);
      localStorage.setItem(
        'recent-searches',
        JSON.stringify([...recents, slug as string]),
      );
    }
  }, [slug, results]);

  return (
    <SearchStorageContext.Provider
      value={{ recentSearches, setRecentSearches }}
    >
      {children}
    </SearchStorageContext.Provider>
  );
};
