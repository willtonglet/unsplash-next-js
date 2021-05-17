import Image, { ImageProps } from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Masonry from '../../components/Masonry';
import Spinner from '../../components/Spinner';
import api from '../../core/api';
import { useScrollBottom } from '../../hooks/useScrollBottom';

const MasonrySection = () => {
  const [count, setCount] = useState(1);
  const [photos, setPhotos] = useState<ImageProps[]>([]);
  const [scrollEl, atBottom] = useScrollBottom();

  const getPhotos = async (c: number) => {
    const { data } = await api.get(`/photos?page=${c}&per_page=30`);
    setPhotos([...photos, ...data]);
  };

  useEffect(() => {
    getPhotos(count);
  }, [count]);

  useEffect(() => {
    const timerToLoad = setTimeout(() => {
      if (atBottom) setCount(count + 1);
    }, 250);

    return () => clearTimeout(timerToLoad);
  }, [count, photos, atBottom]);

  return (
    <section className="flex flex-col w-full" ref={count < 5 ? scrollEl : null}>
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
        <div className="flex w-full justify-center mt-3 mb-5">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default MasonrySection;
