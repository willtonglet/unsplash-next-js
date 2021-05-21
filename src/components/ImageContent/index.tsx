import Link from 'next/link';
import React from 'react';
import { IoIosAdd, IoIosHeart, IoMdArrowDown } from 'react-icons/io';
import { useContextualRouting } from '../../hooks/useContextualRouting';
import AvatarInfo from '../AvatarInfo';
import ButtonIcon from '../ButtonIcon';
import ImageWithPreview from '../ImageWithPreview';
import { StyledImageContent } from './styles';

interface ImageContentProps {
  image: ImageProps;
}

const ImageContent = (props: ImageContentProps): JSX.Element => {
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
        <ImageWithPreview
          key={image.id}
          src={image.urls.regular}
          previewSrc={image.urls.thumb}
          width={image.width}
          height={image.height}
          alt={image.alt_description}
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
      </StyledImageContent>
    </Link>
  );
};

export default ImageContent;
