import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';
import RenderIfVisible from '@components/RenderIfVisible';
import ImageContent from '@components/ImageContent';

interface MasonrySearchTabPhotosProps {
  onPhotoClick?: React.MouseEventHandler<HTMLDivElement>;
  photos: ImageProps[];
}

const MasonrySearchTabPhotos = (
  props: MasonrySearchTabPhotosProps,
): React.ReactElement => {
  const { onPhotoClick, photos } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalPhotosNavigationContext);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) setPhotosData([]);
    setPage(1);
  }, [slug]);

  const getPhotos = () => {
    apiRoute
      .get(`/search/photos`, {
        params: {
          query: slug,
          page: page,
          per_page: 12,
        },
      })
      .then((response) => {
        const arr = [...photosData, ...response.data.results];
        setPhotosData(arr);
      });
  };

  useEffect(() => {
    setPhotosData(photos);
  }, [photos]);

  useEffect(() => {
    if (page > 1) getPhotos();
  }, [page]);

  return (
    <ContainerWrapper className="py-12">
      <Masonry onScrollIntersection={() => setPage((prev) => prev + 1)}>
        {photosData?.map((photo, index) =>
          index <= 2 ? (
            <ImageContent
              image={photo}
              key={photo.id}
              priority
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

export default MasonrySearchTabPhotos;
