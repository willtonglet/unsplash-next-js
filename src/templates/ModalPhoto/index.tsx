import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '@components/AvatarInfo';
import Modal from '@components/Modal';
import PhotoContent from '@templates/PhotoContent';
import ModalMasonry from '@templates/ModalMasonry';
import { api } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import { usePreviousState } from '@hooks/usePreviousState';
import { handlePreviousAndNext } from '@core/utils/handlePreviousAndNext';

interface ModalPhotoProps {
  isOpen?: boolean;
}

const ModalPhoto = ({ isOpen = false }: ModalPhotoProps): JSX.Element => {
  const [photoData, setPhotoData] = useState<ImageProps>();
  const [isRelatedPhoto, setIsRelatedPhoto] = useState(false);
  const [modalNavigationsIds, setmodalNavigationsIds] = useState({
    current: '',
    previous: '',
    next: '',
  });
  const { photosData, modalPhotosData } = useContext(PhotosContext);
  const photoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const previousData = usePreviousState(modalPhotosData);

  const getPhoto = (id: string) =>
    api.get(`/photos/${id}`).then((response) => setPhotoData(response.data));

  useEffect(() => {
    router.query.id && getPhoto(router.query.id as string);
  }, [router.query.id]);

  useEffect(() => {
    const navigationIds = handlePreviousAndNext(
      isRelatedPhoto ? (previousData as unknown as ImageProps[]) : photosData,
      String(router.query.id),
    );
    setmodalNavigationsIds(navigationIds);
  }, [photosData, router.query.id]);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  if (photoData)
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setIsRelatedPhoto(false);
          router.push({ pathname: String(returnHref) }, undefined, {
            scroll: false,
          });
        }}
        previousId={modalNavigationsIds.previous}
        nextId={modalNavigationsIds.next}
      >
        <div className="sticky rounded-t px-2 top-0 bg-white z-20 py-3">
          <AvatarInfo image={photoData} />
        </div>
        <div className="w-full flex justify-center">
          <PhotoContent image={photoData} ref={photoRef} />
        </div>
        <div className="px-3">
          <ModalMasonry
            getUrl={`/collections/${photoData?.related_collections.results[0].id}/photos`}
            onPhotoClick={() => {
              setIsRelatedPhoto(true);
              photoRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </Modal>
    );

  return <></>;
};

export default ModalPhoto;
