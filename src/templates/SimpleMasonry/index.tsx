import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import RenderIfVisible from '@components/RenderIfVisible';

const ImageContent = dynamic(() => import('@components/ImageContent'), {
  ssr: false,
});

interface SimpleMasonryProps {
  onPhotoClick?: React.MouseEventHandler<HTMLDivElement>;
  photos: ImageProps[];
}

const SimpleMasonry = (props: SimpleMasonryProps): React.ReactElement => {
  const { photos, onPhotoClick } = props;
  const { setIsModalOpen } = useContext(ModalPhotosNavigationContext);

  return (
    <Masonry>
      {photos?.map((photo, index) =>
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
  );
};

export default SimpleMasonry;
