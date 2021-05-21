import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import Masonry from '../../components/Masonry';
import Spinner from '../../components/Spinner';
import { api } from '../../core/middleware/api';
import ImageContent from '../../components/ImageContent';
import { AppContext } from '../../contexts/AppContext';
import useMediaQuery from '../../hooks/useMediaQuery';

interface MasonrySectionProps {
  getUrl: string;
}

const MasonrySection = (props: MasonrySectionProps): JSX.Element => {
  const { getUrl } = props;
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(3);
  const { photosData, setPhotosData } = useContext(AppContext);
  const loader = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    getPhotos();
  }, [page]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    if (isXs) setColumns(1);
    if (isMd) setColumns(2);
    if (isLg) setColumns(3);
  }, [isXs, isMd, isLg]);

  return (
    <section className="flex flex-col w-full items-center bg-gray-50 py-12">
      <div className="w-full max-w-screen-xl flex flex-col">
        <Masonry columnsCount={columns} gutter="1.5rem">
          {photosData?.map((photo) => (
            <ImageContent key={photo.id} image={photo} />
          ))}
        </Masonry>
        <div className="flex w-full my-6 justify-center" ref={loader}>
          <Spinner />
        </div>
      </div>
    </section>
  );
};

export default MasonrySection;
