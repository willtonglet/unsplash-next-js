import React, { useState, useEffect, useContext } from 'react';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';
import RenderIfVisible from '@components/RenderIfVisible';
import ImageContent from '@components/ImageContent';

interface MasonryCustomSectionProps {
  onPhotoClick?: React.MouseEventHandler<HTMLDivElement>;
  photos: ImageProps[];
  url?: string;
  queryToBeListened?: string | string[];
}

const MasonryCustomSection = (
  props: MasonryCustomSectionProps,
): React.ReactElement => {
  const { onPhotoClick, photos, url, queryToBeListened } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalPhotosNavigationContext);

  useEffect(() => {
    if (queryToBeListened) setPhotosData([]);
    setPage(1);
  }, [queryToBeListened, url]);

  const getPhotos = (url: string) =>
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
    if (page > 1 && url) getPhotos(url);
  }, [page, url]);

  return (
    <ContainerWrapper className="py-12 md:px-3 lg:px-0">
      <Masonry
        onScrollIntersection={
          (url ? () => setPage((prev) => prev + 1) : null) as () => void | null
        }
      >
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
