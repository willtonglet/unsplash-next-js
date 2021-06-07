import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { apiRoute } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';
import ContainerWrapper from '@components/ContainerWrapper';

interface MasonrySearchTabPhotosProps {
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  photos: ImageProps[];
}

const MasonrySearchTabPhotos = (
  props: MasonrySearchTabPhotosProps,
): React.ReactElement => {
  const { onPhotoClick, photos } = props;
  const [page, setPage] = useState(1);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) setPhotosData([]);
    setPage(1);
  }, [slug]);

  const getPhotos = () => {
    apiRoute
      .get(`/search/photos`, {
        params: {
          query: slug,
          page: page,
          per_page: 30,
        },
      })
      .then((response) => {
        const arr = [...photosData, ...response.data.results];
        setPhotosData(arr);
      });
  };

  useEffect(() => {
    setPhotosData(photos);
  }, [photos]);

  useEffect(() => {
    if (page > 1) getPhotos();
  }, [page]);

  return (
    <ContainerWrapper className="py-12">
      <Masonry onScrollIntersection={() => setPage((prev) => prev + 1)}>
        {photosData?.map((photo) => (
          <div key={photo.id} className="flex flex-col">
            <ImageContent
              image={photo}
              onPhotoClick={(e) => {
                setIsModalOpen(true);
                onPhotoClick && onPhotoClick(e);
              }}
            />

            <div className="mt-3">
              {photo.tags?.map((tag, index) => (
                <Link
                  key={index}
                  href={
                    tag.type === 'search'
                      ? `/s/photos/${tag.title}`
                      : `/images/${tag.title}`
                  }
                >
                  <a className="bg-gray-200 rounded text-sm text-gray-600 inline-block px-2 py-1 mr-2 mb-2 capitalize">
                    {tag.type === 'search' ? tag.title : tag.source.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Masonry>
    </ContainerWrapper>
  );
};

export default MasonrySearchTabPhotos;
