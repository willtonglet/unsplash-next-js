import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';

interface MasonrySectionTopicsProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const MasonrySectionTopics = (
  props: MasonrySectionTopicsProps,
): JSX.Element => {
  const { onPhotoClick, photos } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();

  const getPhotos = (slug: string) => {
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
    if (page > 1) {
      router.query.slug && getPhotos(String(router.query.slug));
    } else {
      setPhotosData(photos);
    }
  }, [page, router.query.slug, photos]);

  return (
    <section className="py-12">
      <div className="flex flex-col w-full items-center">
        <div className="w-full max-w-screen-xl flex flex-col z-10">
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
        </div>
      </div>
    </section>
  );
};

export default MasonrySectionTopics;
