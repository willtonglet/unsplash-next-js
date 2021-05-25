import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '@components/AvatarInfo';
import Modal from '@components/Modal';
import PhotoContent from '@templates/PhotoContent';
import CommonMasonry from '@templates/CommonMasonry';
import { api } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { NavigationIdsProps, PhotosContext } from '@contexts/PhotosContext';
import { usePreviousState } from '@hooks/usePreviousState';

const ModalPhoto = (): JSX.Element => {
  const [photoData, setPhotoData] = useState<ImageProps>();
  const [isRelatedPhoto, setIsRelatedPhoto] = useState(false);
  const {
    photosData,
    modalPhotosData,
    setmodalNavigationsIds,
    modalNavigationsIds,
  } = useContext(PhotosContext);
  const photoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const previousData = usePreviousState(modalPhotosData);

  const getPhoto = (id: string) =>
    api.get(`/photos/${id}`).then((response) => setPhotoData(response.data));

  const handlePreviousAndNext = (data: ImageProps[], queryId: string) => {
    const currentIndex = data.findIndex((photo) => photo.id === queryId);

    return {
      current: data.find((photo) => photo.id === queryId)?.id,
      previous: data[currentIndex - 1]?.id,
      next: data[currentIndex + 1]?.id,
    };
  };

  useEffect(() => {
    router.query.id && getPhoto(router.query.id as string);
  }, [router.query.id]);

  useEffect(() => {
    const navigationIds = handlePreviousAndNext(
      isRelatedPhoto ? (previousData as unknown as ImageProps[]) : photosData,
      String(router.query.id),
    );
    setmodalNavigationsIds(navigationIds as NavigationIdsProps);
  }, [photosData, router.query.id]);

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
        <CommonMasonry
          getUrl={`/collections/${photoData?.related_collections.results[0].id}/photos`}
          onPhotoClick={() => {
            setIsRelatedPhoto(true);
            photoRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </Modal>
    );

  return <></>;
};

export default ModalPhoto;
