import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '@components/AvatarInfo';
import Modal from '@components/Modal';
import PhotoContent from '@templates/PhotoContent';
import SimpleMasonry from '@templates/SimpleMasonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import { usePreviousState } from '@hooks/usePreviousState';
import { handlePreviousAndNext } from '@core/utils/handlePreviousAndNext';
import HireLink from '@components/HireLink';

interface ModalPhotoProps {
  isOpen?: boolean;
}

const ModalPhoto = ({
  isOpen = false,
}: ModalPhotoProps): React.ReactElement => {
  const [photoData, setPhotoData] = useState<ImageProps>();
  const [isRelatedPhoto, setIsRelatedPhoto] = useState(false);
  const [modalNavigationsIds, setmodalNavigationsIds] = useState({
    current: '',
    previous: '',
    next: '',
  });
  const { photosData, modalPhotosData, setModalPhotosData } =
    useContext(PhotosContext);
  const photoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const previousData = usePreviousState(modalPhotosData);

  const getPhoto = (id: string) =>
    apiRoute
      .get(`/photos/${id}`)
      .then((response) => setPhotoData(response.data));

  const getRelatedPhotos = (id: string) =>
    apiRoute
      .get(`/photos/${id}/related`)
      .then((response) => setModalPhotosData(response.data.results));

  useEffect(() => {
    const getRouteId = router.query.id as string;
    if (router.query.id) {
      getPhoto(getRouteId);
      getRelatedPhotos(getRouteId);
    }
  }, [router.query.id]);

  useEffect(() => {
    const navigationIds =
      photosData &&
      handlePreviousAndNext(
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
            shallow: true,
          });
        }}
        previousId={modalNavigationsIds.previous}
        nextId={modalNavigationsIds.next}
      >
        <div className="sticky rounded-t px-2 top-0 bg-white z-20 py-3">
          <AvatarInfo image={photoData} withHoverEffect={false}>
            {photoData.user.for_hire ? (
              <HireLink />
            ) : (
              <Link href={`/@${photoData.user.username}`}>
                <a className="text-xs text-gray-500">
                  @{photoData.user.username}
                </a>
              </Link>
            )}
          </AvatarInfo>
        </div>
        <div className="w-full flex justify-center">
          <PhotoContent image={photoData} ref={photoRef} />
        </div>
        <div className="px-3">
          <SimpleMasonry
            photos={modalPhotosData}
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
