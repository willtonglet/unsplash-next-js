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
  const { photosData, setPhotosData } = useContext(AppContext);
  const spinnerRef = useRef<HTMLDivElement>(null);
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
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (spinnerRef.current) observer.observe(spinnerRef.current);
  }, [handleObserver]);

  useEffect(() => {
    getPhotos();
  }, [page]);

  useEffect(() => {
    if (isXs) setColumns(1);
    if (isMd) setColumns(2);
    if (isLg) setColumns(3);
  }, [isXs, isMd, isLg]);

  console.log(spinnerRef);

  return (
    <section className="flex flex-col w-full items-center bg-gray-50 py-12">
      <div className="w-full max-w-screen-xl flex flex-col">
        <Masonry columnsCount={columns} gutter="1.5rem" spinnerRef={spinnerRef}>
          {photosData?.map((photo) => (
            <ImageContent key={photo.id} image={photo} />
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default MasonrySection;
