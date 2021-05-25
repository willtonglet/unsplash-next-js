import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export interface NavigationIdsProps {
  current: string;
  previous: string;
  next: string;
}

interface PhotosContextProps {
  photosData: ImageProps[];
  setPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
  modalPhotosData: ImageProps[];
  setModalPhotosData: Dispatch<SetStateAction<ImageProps[]>>;
  modalNavigationsIds: NavigationIdsProps;
  setmodalNavigationsIds: Dispatch<SetStateAction<NavigationIdsProps>>;
}

export const PhotosContext = createContext<PhotosContextProps>({
  photosData: [] as ImageProps[],
  setPhotosData: () => null,
  modalPhotosData: [] as ImageProps[],
  setModalPhotosData: () => null,
  modalNavigationsIds: {} as NavigationIdsProps,
  setmodalNavigationsIds: () => null,
});

export const PhotosContextProvider: React.FC = ({ children }) => {
  const [photosData, setPhotosData] = useState<ImageProps[]>([]);
  const [modalPhotosData, setModalPhotosData] = useState<ImageProps[]>([]);
  const [modalNavigationsIds, setmodalNavigationsIds] =
    useState<NavigationIdsProps>({
      current: '',
      previous: '',
      next: '',
    });

  return (
    <PhotosContext.Provider
      value={{
        photosData,
        setPhotosData,
        modalPhotosData,
        setModalPhotosData,
        modalNavigationsIds,
        setmodalNavigationsIds,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
