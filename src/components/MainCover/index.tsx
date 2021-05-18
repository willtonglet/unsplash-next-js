import React from 'react';
import Image from 'next/image';
import { ImageProps } from '../../pages/_home';
import { StyledMainCover } from './styles';

interface MainCoverProps {
  image?: ImageProps;
}

const MainCover = ({ image }: MainCoverProps) => {
  return (
    <StyledMainCover className="text-white">
      {image && (
        <Image
          src={image.urls.full}
          width={image.width}
          height={image.height}
          layout="responsive"
          priority
          className="bg"
        />
      )}
      <div className="absolute top-0 left-0 h-full bg-opacity-50 bg-black w-screen flex items-center justify-center">
        <div className="flex flex-col w-2/3">
          <h2 className="text-5xl font-bold mb-5">Unsplash</h2>
          <p className="text-lg">
            The internet’s source of freely-usable images.
            <br />
            Powered by creators everywhere.
          </p>
        </div>
      </div>
    </StyledMainCover>
  );
};

export default MainCover;
