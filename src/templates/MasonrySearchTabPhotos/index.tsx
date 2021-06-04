import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';

interface MasonrySearchTabPhotosProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MasonrySearchTabPhotos = (
  props: MasonrySearchTabPhotosProps,
): JSX.Element => {
  const { onPhotoClick } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();

  const getPhotos = (slug: string) => {
    apiRoute
      .get(`/search/photos`, {
        params: {
          query: slug,
          page: page,
          per_page: 30,
        },
      })
      .then((response) => {
        if (page > 1) {
          const arr = [...photosData, ...response.data.results];

          setPhotosData(arr);
        } else {
          setPhotosData(response.data.results);
        }
      });
  };

  useEffect(() => {
    router.query.slug && getPhotos(String(router.query.slug));
  }, [page, router.query.slug]);

  return (
    <section className="bg-gray-50 py-12">
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

export default MasonrySearchTabPhotos;
