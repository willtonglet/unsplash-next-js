import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import ImageContent from '@components/ImageContent';
import Masonry from '@components/Masonry';
import { AppContext } from '@contexts/AppContext';
import { api } from '@core/middleware/api';
import useMediaQuery from '@hooks/useMediaQuery';

interface MasonrySectionProps {
  getUrl: string;
}

const MasonrySection = (props: MasonrySectionProps): JSX.Element => {
  const { getUrl } = props;
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(3);
  const [inifiniteScrollSize, setInfiniteScrollSize] = useState(0);

  const { photosData, setPhotosData } = useContext(AppContext);
  const infiniteScrollRef = useRef<HTMLDivElement>(null);
  const isXs = useMediaQuery('xs');
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');

  const getPhotos = () => {
    api
      .get(getUrl, {
        params: {
          page,
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
      setPage((prev: number) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (infiniteScrollRef.current) observer.observe(infiniteScrollRef.current);
  }, [handleObserver]);

  useEffect(() => {
    getPhotos();
  }, [page]);

  useEffect(() => {
    if (isXs) setColumns(1);
    if (isMd) setColumns(2);
    if (isLg) setColumns(3);
  }, [isXs, isMd, isLg]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-screen-xl flex flex-col z-10">
        <Masonry
          columnsCount={columns}
          gutter="1.5rem"
          onColumnsDifferenceSizes={(val: number) => setInfiniteScrollSize(val)}
        >
          {photosData?.map((photo) => (
            <ImageContent key={photo.id} image={photo} />
          ))}
        </Masonry>
      </div>
      <div
        className="w-screen"
        style={{ marginTop: `-${inifiniteScrollSize}px` }}
        ref={infiniteScrollRef}
      />
    </div>
  );
};

export default MasonrySection;
