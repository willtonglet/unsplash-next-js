import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useRouter } from 'next/router';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';

const ImageContent = React.lazy(() => import('@components/ImageContent'));

interface MasonrySectionTopicsProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const MasonrySectionTopics = (
  props: MasonrySectionTopicsProps,
): React.ReactElement => {
  const { onPhotoClick, photos } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) setPhotosData([]);
    setPage(1);
  }, [slug]);

  const getPhotos = () => {
    apiRoute
      .get(`/topics/${slug}/photos`, {
        params: {
          page: page,
          per_page: 30,
        },
      })
      .then((response) => {
        const arr = [...photosData, ...response.data];
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
        {photosData?.map((photo) => (
          <Suspense
            key={photo.id}
            fallback={
              <div
                style={{
                  backgroundColor: photo.color,
                  height: photo.height / 10,
                }}
              />
            }
          >
            <ImageContent
              key={photo.id}
              image={photo}
              onPhotoClick={(e) => {
                setIsModalOpen(true);
                onPhotoClick && onPhotoClick(e);
              }}
            />
          </Suspense>
        ))}
      </Masonry>
    </ContainerWrapper>
  );
};

export default MasonrySectionTopics;
