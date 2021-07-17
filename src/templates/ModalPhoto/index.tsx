import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useContextualRouting } from '@hooks/useContextualRouting';
import ModalPhotosNavigation from '@components/ModalPhotosNavigation';
import PhotoContent from '@templates/PhotoContent';
import RelatedPhotosMasonry from '@templates/RelatedPhotosMasonry';
import { apiRoute } from '@core/middleware/api';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import { PhotosContext } from '@contexts/PhotosContext';
import { usePreviousState } from '@hooks/usePreviousState';
import { handlePreviousAndNext } from '@core/utils/handlePreviousAndNext';
import Spinner from '@components/Spinner';
import Tags from '@components/Tags';
import RelatedCollectionsMasonry from '@templates/RelatedCollectionsMasonry';
import PhotoHeader from '@templates/PhotoHeader';
import PhotoRelatedTitleWithChildren from '@templates/PhotoRelatedTitleWithChildren';
import PhotoInfo from '@templates/PhotoInfo';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { returnHref, makeContextualHref } = useContextualRouting();
  const { isModalOpen, setIsModalOpen } = useContext(
    ModalPhotosNavigationContext,
  );
  const previousData: unknown | ImageProps[] =
    usePreviousState(modalPhotosData);
  const currentId = returnHref && String(returnHref).split('/')[2];

  const getPhoto = (id: string) =>
    apiRoute
      .get(`/photos/${id}`)
      .then((response) => setPhotoData(response.data));

  const getRelatedPhotos = (id: string) =>
    apiRoute
      .get(`/photos/${id}/related`)
      .then((response) => setModalPhotosData(response.data.results));

  useEffect(() => {
    if (router.query.id && router.query.id !== currentId) {
      getPhoto(router.query.id as string);
      getRelatedPhotos(router.query.id as string);
    }
  }, [router.query.id, currentId]);

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

  console.log(photoData?.related_collections.results);

  return (
    <ModalPhotosNavigation
      ref={modalRef}
      isOpen={isModalOpen}
      onRequestClose={() => {
        setPhotoData(undefined);
        setModalPhotosData([]);
        setIsModalOpen(false);
        setIsRelatedPhoto(false);
        router.push({ pathname: String(returnHref) }, undefined, {
          scroll: false,
          shallow: true,
        });
      }}
      onClickPrevious={
        modalNavigationsIds.previous
          ? () => {
              setPhotoData(undefined);
              router.push(
                makeContextualHref({ id: modalNavigationsIds.previous }),
                `/photos/${modalNavigationsIds.previous}`,
                { shallow: true, scroll: false },
              );
            }
          : null
      }
      onClickNext={
        modalNavigationsIds.next
          ? () => {
              setPhotoData(undefined);
              router.push(
                makeContextualHref({ id: modalNavigationsIds.next }),
                `/photos/${modalNavigationsIds.next}`,
                { shallow: true, scroll: false },
              );
            }
          : null
      }
    >
      {photoData ? (
        <div className="pb-16">
          <PhotoHeader
            photoData={photoData}
            className="sticky rounded-t px-4 top-0 z-20"
          />
          <div className="w-full flex justify-center">
            <PhotoContent image={photoData} />
          </div>
          <PhotoInfo photoInfo={photoData} />
          {photoData.tags && photoData.tags.length && (
            <PhotoRelatedTitleWithChildren className="p-4" title="Related tags">
              <Tags tags={photoData.tags} />
            </PhotoRelatedTitleWithChildren>
          )}
          <PhotoRelatedTitleWithChildren className="p-4" title="Related photos">
            <RelatedPhotosMasonry
              photos={modalPhotosData}
              onPhotoClick={() => {
                setIsRelatedPhoto(true);
                setPhotoData(undefined);
                if (modalRef.current) modalRef.current.scrollTo(0, 0);
              }}
            />
          </PhotoRelatedTitleWithChildren>
          {photoData?.related_collections.total > 0 && (
            <PhotoRelatedTitleWithChildren
              className="p-4"
              title="Related collections"
            >
              <RelatedCollectionsMasonry
                collections={photoData?.related_collections.results}
              />
            </PhotoRelatedTitleWithChildren>
          )}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </ModalPhotosNavigation>
  );
};

export default ModalPhoto;
