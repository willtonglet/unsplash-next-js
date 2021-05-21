import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface AppContextProps {
  photosData: ImageProps[];
  setPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
}

export const AppContext = createContext<AppContextProps>({
  photosData: [] as ImageProps[],
  setPhotosData: () => null,
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [photosData, setPhotosData] = useState<ImageProps[]>([]);

  return (
    <AppContext.Provider value={{ photosData, setPhotosData }}>
      {children}
    </AppContext.Provider>
  );
};
