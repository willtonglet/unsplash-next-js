import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Masonry from '@components/Masonry';
import { ModalContext } from '@components/Modal/ModalContext';

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
