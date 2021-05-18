import React from 'react';
import Image from 'next/image';
import { ImageProps } from '../../pages/_home';

export interface Props {
  image?: ImageProps;
}

const MainCover = ({ image }: Props) => {
  return (
    <section className="text-white relative">
      {image && (
        <Image
          src={image.urls.full}
          width={image.width}
          height={image.height}
          layout="responsive"
          priority
        />
      )}
      <div className="absolute top-0 left-0 h-full w-screen flex items-center justify-center">
        <div className="flex flex-col w-2/3">
          <h2 className="text-5xl font-bold mb-5">Unsplash</h2>
          <p className="text-lg">
            The internet’s source of freely-usable images.
            <br />
            Powered by creators everywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainCover;
