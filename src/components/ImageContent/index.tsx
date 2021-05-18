/* eslint-disable camelcase */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  IoIosAdd,
  IoIosHeart,
  IoMdArrowDown,
  IoMdCheckmarkCircleOutline,
} from 'react-icons/io';
import { ImageProps } from '../../pages/_home';
import ButtonIcon from '../ButtonIcon';
import { StyledImageContent } from './styles';

interface ImageContentProps {
  image: ImageProps;
  href: string;
}

const ImageContent = (props: ImageContentProps) => {
  const { image, href } = props;

  return (
    <Link href={href} key={image.id}>
      <StyledImageContent className="relative flex">
        <Image
          src={image.urls.regular}
          alt={image.alt_description}
          width={image.width}
          height={image.height}
          className="z-10"
        />
        <div className="content bg-opacity-40 bg-black text-white z-20">
          <div className="flex justify-end items-center">
            <ButtonIcon>
              <IoIosHeart size={22} />
            </ButtonIcon>
            <ButtonIcon className="ml-2">
              <IoIosAdd size={28} />
            </ButtonIcon>
          </div>
          <div className="flex justify-between items-end w-full">
            <div className="flex items-center">
              <img
                src={image.user.profile_image.medium}
                alt={image.user.name}
                className="overflow-hidden h-9 w-9 rounded-full"
              />
              <div className="flex flex-col ml-2">
                <span>{image.user.name}</span>
                {image.user.for_hire && (
                  <div className="flex items-center">
                    <span className="text-xs font-light">
                      Available for hire
                    </span>
                    <IoMdCheckmarkCircleOutline size={12} className="ml-1" />
                  </div>
                )}
              </div>
            </div>
            <ButtonIcon>
              <IoMdArrowDown size={24} />
            </ButtonIcon>
          </div>
        </div>
        <div className="animate-pulse bg-gray-300 w-full h-full absolute top-0 left-0" />
      </StyledImageContent>
    </Link>
  );
};

export default ImageContent;
