import React, { useState, useEffect, useContext } from 'react';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { api } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';

interface MasonrySectionProps {
  getUrl: string;
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  withInfiniteScroll?: boolean;
}

const MasonrySection = (props: MasonrySectionProps): JSX.Element => {
  const { getUrl, onPhotoClick, withInfiniteScroll = true } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);

  const getPhotos = (url: string) => {
    api
      .get(url, {
        params: {
          page: withInfiniteScroll ? page : 1,
          per_page: 30,
        },
      })
      .then((response) => {
        if (page > 1) {
          const arr = [...photosData, ...response.data];

          setPhotosData(arr);
        } else {
          setPhotosData(response.data);
        }
      });
  };

  useEffect(() => {
    getPhotos(getUrl);
  }, [getUrl, page]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-screen-xl flex flex-col z-10">
        <Masonry
          onScrollIntersection={() =>
            withInfiniteScroll && setPage((prev) => prev + 1)
          }
        >
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
  );
};

export default MasonrySection;
