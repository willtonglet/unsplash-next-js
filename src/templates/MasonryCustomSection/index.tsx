import React, { useState, useEffect, useContext } from 'react';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';
import RenderIfVisible from '@components/RenderIfVisible';
import ImageContent from '@components/ImageContent';

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
          per_page: 12,
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

  console.log({ page });

  return (
    <ContainerWrapper className="py-12">
      <Masonry onScrollIntersection={() => setPage((prev) => prev + 1)}>
        {photosData?.map((photo, index) =>
          index <= 2 ? (
            <ImageContent
              key={photo.id}
              priority
              image={photo}
              onPhotoClick={(e) => {
                setIsModalOpen(true);
                onPhotoClick && onPhotoClick(e);
              }}
            />
          ) : (
            <RenderIfVisible key={photo.id}>
              <ImageContent
                image={photo}
                loading="lazy"
                onPhotoClick={(e) => {
                  setIsModalOpen(true);
                  onPhotoClick && onPhotoClick(e);
                }}
              />
            </RenderIfVisible>
          ),
        )}
      </Masonry>
    </ContainerWrapper>
  );
};

export default MasonryCustomSection;
