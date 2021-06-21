import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import { ModalContext } from '@components/Modal/ModalContext';
import RenderIfVisible from '@components/RenderIfVisible';

const ImageContent = dynamic(() => import('@components/ImageContent'), {
  ssr: false,
});

interface SimpleMasonryProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const SimpleMasonry = (props: SimpleMasonryProps): React.ReactElement => {
  const { photos, onPhotoClick } = props;
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <Masonry>
      {photos?.map((photo, index) =>
        index <= 2 ? (
          <ImageContent
            image={photo}
            key={photo.id}
            priority
            loading="lazy"
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
