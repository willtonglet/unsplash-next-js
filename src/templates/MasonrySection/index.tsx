import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { api } from '@core/middleware/api';
import { ModalContext } from '@components/Modal/ModalContext';
import { PhotosContext } from '@contexts/PhotosContext';

interface MasonrySectionProps {
  getUrl: string;
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  withInfiniteScroll?: boolean;
}

const MasonrySection = (props: MasonrySectionProps): JSX.Element => {
  const { getUrl, onPhotoClick, withInfiniteScroll = true } = props;
  const [page, setPage] = useState(1);
  const [inifiniteScrollSize, setInfiniteScrollSize] = useState(0);
  const { photosData, setPhotosData } = useContext(PhotosContext);
  const { setIsModalOpen } = useContext(ModalContext);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);

  const getPhotos = (url: string) => {
    api
      .get(url, {
        params: {
          page: withInfiniteScroll ? page : 1,
          per_page: 30,
        },
      })
      .then((response) => {
        if (page > 1) {
          const arr = [...photosData, ...response.data];

          setPhotosData(arr);
        } else {
          setPhotosData(response.data);
        }
      });
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (infiniteScrollRef.current && withInfiniteScroll)
      observer.observe(infiniteScrollRef.current);
  }, [handleObserver, withInfiniteScroll]);

  useEffect(() => {
    getPhotos(getUrl);
  }, [getUrl, page]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-screen-xl flex flex-col z-10">
        <Masonry
          onColumnsDifferenceSizes={(val: number) =>
            withInfiniteScroll && setInfiniteScrollSize(val)
          }
        >
          {photosData?.map((photo) => (
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
      </div>
      <div
        className="w-screen"
        style={{
          marginTop: `-${withInfiniteScroll ? inifiniteScrollSize : 0}px`,
        }}
        ref={infiniteScrollRef}
      />
    </div>
  );
};

export default MasonrySection;
