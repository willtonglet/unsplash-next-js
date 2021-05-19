import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { ImageProps } from '../pages/_home';

interface AppContextProps {
  photosData: ImageProps[];
  setPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
}

export const AppContext = createContext<AppContextProps>({
  photosData: [] as ImageProps[],
  setPhotosData: () => {},
});

export const AppContextProvider: React.FC = ({ children }) => {
  const [photosData, setPhotosData] = useState<ImageProps[]>([]);

  return (
    <AppContext.Provider value={{ photosData, setPhotosData }}>
      {children}
    </AppContext.Provider>
  );
};
