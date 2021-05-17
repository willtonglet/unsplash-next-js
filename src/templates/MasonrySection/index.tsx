import Image, { ImageProps } from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Masonry from '../../components/Masonry';
import Spinner from '../../components/Spinner';
import api from '../../core/api';
import useOnScreen from '../../hooks/useOnScreen';

const MasonrySection = () => {
  const [count, setCount] = useState(1);
  const [photos, setPhotos] = useState<ImageProps[]>([]);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(spinnerRef, '0px', true);

  const getPhotos = async (c: number) => {
    const { data } = await api.get(`/photos?page=${c}&per_page=30`);
    setPhotos([...photos, ...data]);
  };

  useEffect(() => {
    getPhotos(count);
  }, [count]);

  useEffect(() => {
    if (onScreen) setCount(count + 1);
  }, [count, onScreen]);

  return (
    <section className="flex flex-col w-full">
      <Masonry gutter="1.5rem">
        {photos?.map((photo: any) => (
          <div key={photo.id}>
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description}
              width={photo.width}
              height={photo.height}
            />
          </div>
        ))}
      </Masonry>
      {count < 5 && (
        <div className="flex w-full justify-center mt-3 mb-5" ref={spinnerRef}>
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default MasonrySection;
