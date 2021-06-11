import React, { Suspense, useContext } from 'react';
import Masonry from '@components/Masonry';
import { ModalContext } from '@components/Modal/ModalContext';

const ImageContent = React.lazy(() => import('@components/ImageContent'));

interface SimpleMasonryProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const SimpleMasonry = (props: SimpleMasonryProps): React.ReactElement => {
  const { photos, onPhotoClick } = props;
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <Masonry>
      {photos.map((photo) => (
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
  );
};

export default SimpleMasonry;
