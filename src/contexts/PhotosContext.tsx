import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface PhotosContextProps {
  photosData: ImageProps[];
  setPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
  modalPhotosData: ImageProps[];
  setModalPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
}

export const PhotosContext = createContext<PhotosContextProps>({
  photosData: [] as ImageProps[],
  setPhotosData: () => null,
  modalPhotosData: [] as ImageProps[],
  setModalPhotosData: () => null,
});

export const PhotosContextProvider: React.FC = ({ children }) => {
  const [photosData, setPhotosData] = useState<ImageProps[]>([]);
  const [modalPhotosData, setModalPhotosData] = useState<ImageProps[]>([]);

  return (
    <PhotosContext.Provider
      value={{
        photosData,
        setPhotosData,
        modalPhotosData,
        setModalPhotosData,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
