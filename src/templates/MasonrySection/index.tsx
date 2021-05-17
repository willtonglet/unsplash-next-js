import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Masonry from '../../components/Masonry';
import Spinner from '../../components/Spinner';
import api from '../../core/api';
import useOnScreen from '../../hooks/useOnScreen';
import { ImageProps } from '../../pages/_home';

const MasonrySection = () => {
  const [count, setCount] = useState(1);
  const [photos, setPhotos] = useState<ImageProps[]>([]);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(spinnerRef, '0px', true);

  const getPhotos = async (c: number) => {
    const { data } = await api.get(`/photos?page=${c}&per_page=24`);
    setPhotos([...photos, ...data]);
  };

  useEffect(() => {
    if (count < 5) getPhotos(count);
  }, [count]);

  useEffect(() => {
    if (onScreen) setCount(count + 1);
  }, [onScreen, count]);

  return (
    <section className="flex flex-col w-full items-center bg-gray-50 py-12">
      <div className="w-full max-w-screen-xl">
        <Masonry gutter="1.5rem">
          {photos?.map((photo) => (
            <div className="relative flex" key={photo.id}>
              <Image
                src={photo.urls.regular}
                alt={photo.alt_description}
                width={photo.width}
                height={photo.height}
                priority
                className="z-10"
              />
              <div className="animate-pulse bg-gray-300 w-full h-full absolute top-0 left-0" />
            </div>
          ))}
        </Masonry>
        {count < 5 && (
          <div
            className="flex w-full justify-center mt-3 mb-5"
            ref={spinnerRef}
          >
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

export default MasonrySection;
