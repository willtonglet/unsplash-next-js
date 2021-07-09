import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '@components/AvatarInfo';
import ModalPhotosNavigation from '@components/ModalPhotosNavigation';
import PhotoContent from '@templates/PhotoContent';
import RelatedPhotosMasonry from '@templates/RelatedPhotosMasonry';
import { apiRoute } from '@core/middleware/api';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import { PhotosContext } from '@contexts/PhotosContext';
import { usePreviousState } from '@hooks/usePreviousState';
import { handlePreviousAndNext } from '@core/utils/handlePreviousAndNext';
import HireLink from '@components/HireLink';
import { numberWithCommas } from '@core/utils/numberWithCommas';
import ModalInfo from '@templates/ModalInfo';
import Spinner from '@components/Spinner';
import Tags from '@components/Tags';
import RelatedCollectionsMasonry from '@templates/RelatedCollectionsMasonry';

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
          <div className="sticky rounded-t px-4 top-0 bg-white z-20 py-3 flex justify-between items-center">
            <AvatarInfo image={photoData} withHoverEffect={false}>
              {photoData.user.for_hire ? (
                <HireLink />
              ) : (
                <Link href={`/@${photoData.user.username}`}>
                  <a className="text-xs text-gray-500 hover:text-gray-800">
                    @{photoData.user.username}
                  </a>
                </Link>
              )}
            </AvatarInfo>
            <a
              href={`https://unsplash.com/photos/${photoData.id}/download?force=true`}
              rel="noreferrer"
              download
              target="_blank"
              className="text-white rounded flex"
            >
              <span className="bg-green-500 rounded-l h-8 text-sm font-medium flex items-center px-3 hover:bg-green-600">
                Download free
              </span>
              <button
                aria-label="Download"
                className="bg-green-500 h-8 flex items-center px-1 border-l rounded-r hover:bg-green-600"
              >
                <svg
                  width="24"
                  height="24"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className="fill-current text-white"
                >
                  <path d="M9.9 11.5l6.1 6.1 6.1-6.1 1.9 1.9-8 8-8-8 1.9-1.9z"></path>
                </svg>
              </button>
            </a>
          </div>
          <div className="w-full flex justify-center">
            <PhotoContent image={photoData} />
          </div>
          <div className="flex justify-between px-4 my-6">
            <div className="flex">
              <div className="w-48">
                <h3 className="text-sm text-gray-500">Views</h3>
                <span>{numberWithCommas(photoData.views)}</span>
              </div>
              <div className="w-48">
                <h3 className="text-sm text-gray-500">Downloads</h3>
                <span>{numberWithCommas(photoData.downloads)}</span>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(
                  makeContextualHref({ id: router.query.id }),
                  `/photos/${router.query.id}/info`,
                  { shallow: true, scroll: false },
                )
              }
              className="border border-gray-300 rounded h-8 px-3 flex items-center group text-gray-500 hover:border-gray-500 hover:text-black"
            >
              <svg
                width="14"
                height="14"
                version="1.1"
                viewBox="0 0 32 32"
                aria-hidden="false"
                className="fill-current group-hover:text-black"
              >
                <path d="M16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm2 25c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-12c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v12zm0-16c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2z"></path>
              </svg>
              <span className="text-sm font-medium ml-2">Info</span>
            </button>

            <ModalInfo infoData={photoData} />
          </div>
          {photoData.tags && photoData.tags.length && (
            <div className="p-4 mb-6">
              <h3 className="text-lg mb-6">Related tags</h3>
              <Tags tags={photoData.tags} />
            </div>
          )}
          <div className="p-4 mb-6">
            <h3 className="text-lg mb-6">Related photos</h3>
            <RelatedPhotosMasonry
              photos={modalPhotosData}
              onPhotoClick={() => {
                setIsRelatedPhoto(true);
                setPhotoData(undefined);
                if (modalRef.current) modalRef.current.scrollTo(0, 0);
              }}
            />
          </div>
          {photoData?.related_collections.total > 0 && (
            <div className="p-4">
              <h3 className="text-lg mb-6">Related collections</h3>
              <RelatedCollectionsMasonry
                collections={photoData?.related_collections.results}
              />
            </div>
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
