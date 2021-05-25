import React, { useContext, useEffect } from 'react';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { api } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';

interface ModalMasonryProps {
  getUrl: string;
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ModalMasonry = (props: ModalMasonryProps): JSX.Element => {
  const { getUrl, onPhotoClick } = props;
  const { modalPhotosData, setModalPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);

  const getPhotos = (url: string) => {
    api
      .get(url, {
        params: {
          page: 1,
          per_page: 30,
        },
      })
      .then((response) => setModalPhotosData(response.data));
  };

  useEffect(() => {
    getPhotos(getUrl);
  }, [getUrl]);

  return (
    <Masonry>
      {modalPhotosData?.map((photo) => (
        <ImageContent
          key={photo.id}
          image={photo}
          onPhotoClick={(e) => {
            setIsModalOpen(true);
            onPhotoClick && onPhotoClick(e);
          }}
        />
      ))}
    </Masonry>
  );
};

export default ModalMasonry;
