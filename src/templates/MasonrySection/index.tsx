import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';

const ImageContent = dynamic(() => import('@components/ImageContent'), {
  ssr: false,
});

interface MasonrySectionProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const MasonrySection = (props: MasonrySectionProps): React.ReactElement => {
  const { onPhotoClick, photos } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    setPhotosData([]);
    setPage(1);
  }, []);

  const getPhotos = () =>
    apiRoute
      .get('/photos', {
        params: {
          page: page,
          per_page: 30,
        },
      })
      .then((response) => {
        const arr = [...photosData, ...response.data];
        setPhotosData(arr);
      });

  useEffect(() => {
    setPhotosData(photos);
  }, [photos]);

  useEffect(() => {
    page > 1 && getPhotos();
  }, [page]);

  return (
    <ContainerWrapper className="py-12">
      <Masonry onScrollIntersection={() => setPage((prev) => prev + 1)}>
        {photosData?.map((photo) => (
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
    </ContainerWrapper>
  );
};

export default MasonrySection;
