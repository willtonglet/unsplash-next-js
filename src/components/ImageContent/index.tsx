/* eslint-disable camelcase */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosAdd, IoIosHeart, IoMdArrowDown } from 'react-icons/io';
import { useContextualRouting } from '../../hooks/useContextualRouting';
import { ImageProps } from '../../pages/_home';
import AvatarInfo from '../AvatarInfo';
import ButtonIcon from '../ButtonIcon';
import { StyledImageContent } from './styles';

interface ImageContentProps {
  image: ImageProps;
}

const ImageContent = (props: ImageContentProps) => {
  const { image } = props;
  const { makeContextualHref } = useContextualRouting();

  return (
    <Link
      href={makeContextualHref({ id: image.id })}
      as={`/photos/${image.id}`}
      key={image.id}
      scroll={false}
    >
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
            <AvatarInfo image={image} />
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
