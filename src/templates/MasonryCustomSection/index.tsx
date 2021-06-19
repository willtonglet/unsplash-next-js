import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';
const ImageContent = dynamic(() => import('@components/ImageContent'));

interface MasonryCustomSectionProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
  url: string;
  queryToBeListened?: string | string[];
}

const MasonryCustomSection = (
  props: MasonryCustomSectionProps,
): React.ReactElement => {
  const { onPhotoClick, photos, url, queryToBeListened } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);

  useEffect(() => {
    if (queryToBeListened) setPhotosData([]);
    setPage(1);
  }, [queryToBeListened, url]);

  const getPhotos = () =>
    apiRoute
      .get(url, {
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
        {photosData?.map((photo, index) => (
          <ImageContent
            key={index}
            priority={index === 0}
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

export default MasonryCustomSection;
