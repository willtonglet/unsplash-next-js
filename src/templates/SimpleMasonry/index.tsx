import React, { useContext } from 'react';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { ModalContext } from '@components/Modal/ModalContext';

interface SimpleMasonryProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const SimpleMasonry = (props: SimpleMasonryProps): JSX.Element => {
  const { photos, onPhotoClick } = props;
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <Masonry>
      {photos.map((photo) => (
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
  );
};

export default SimpleMasonry;
