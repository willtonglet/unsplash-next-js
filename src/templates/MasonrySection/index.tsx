import React, { useState, useEffect, useRef, useContext } from 'react';
import Masonry from '../../components/Masonry';
import Spinner from '../../components/Spinner';
import api from '../../core/api';
import useOnScreen from '../../hooks/useOnScreen';
import ImageContent from '../../components/ImageContent';
import { AppContext } from '../../contexts/AppContext';

interface MasonrySectionProps {
  getUrl: string;
}

const MasonrySection = (props: MasonrySectionProps) => {
  const { getUrl } = props;
  const [count, setCount] = useState(1);
  const [hasSpinner, setHasSpinner] = useState(true);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const { photosData, setPhotosData } = useContext(AppContext);
  const onScreen = useOnScreen(spinnerRef, '0px', false, 1);

  const getPhotos = async (c: number) => {
    const { data } = await api.get(getUrl, {
      params: {
        page: c,
        per_page: 30,
      },
    });
    setPhotosData([...photosData, ...data]);
    setHasSpinner(true);
  };

  useEffect(() => {
    getPhotos(count);
  }, [count]);

  useEffect(() => {
    if (onScreen) {
      setHasSpinner(false);
      setCount(count + 1);
    }
  }, [onScreen, count]);

  return (
    <section className="flex flex-col w-full items-center bg-gray-50 py-12">
      <div className="w-full max-w-screen-xl flex flex-col">
        <Masonry gutter="1.5rem">
          {photosData?.map((photo) => (
            <ImageContent key={photo.id} image={photo} />
          ))}
        </Masonry>
        <div
          className={`flex w-full my-6 justify-center ${
            !hasSpinner && photosData.length === 0 && 'hidden'
          }`}
          ref={spinnerRef}
        >
          <Spinner />
        </div>
      </div>
    </section>
  );
};

export default MasonrySection;
