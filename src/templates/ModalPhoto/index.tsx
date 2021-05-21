import { useRouter } from 'next/router';
import { useContext } from 'react';
import AvatarInfo from '../../components/AvatarInfo';
import Modal from '../../components/Modal';
import { AppContext } from '../../contexts/AppContext';
import { useContextualRouting } from '../../hooks/useContextualRouting';
import PhotoContent from '../PhotoContent';

const ModalPhoto = (): JSX.Element => {
  const { photosData } = useContext(AppContext);
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const currentPhoto = photosData.find((photo) => photo.id === router.query.id);
  const currentPhotoIndex = photosData.findIndex(
    (photo) => photo.id === router.query.id,
  );
  const previousPhoto = photosData[currentPhotoIndex - 1];
  const nextPhoto = photosData[currentPhotoIndex + 1];

  if (currentPhoto && photosData)
    return (
      <Modal
        isOpen={Boolean(router.query.id)}
        requestClose={returnHref as string}
        requestPrevId={previousPhoto?.id}
        requestNextId={nextPhoto?.id}
      >
        <div className="sticky rounded-t px-2 top-0 bg-white z-20 py-3">
          <AvatarInfo image={currentPhoto} />
        </div>
        <div className="w-full flex justify-center">
          <PhotoContent image={currentPhoto} />
        </div>
      </Modal>
    );

  return <></>;
};

export default ModalPhoto;
