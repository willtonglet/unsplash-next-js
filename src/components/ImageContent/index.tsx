import Link from 'next/link';
import { IoMdArrowDown } from 'react-icons/io';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '../AvatarInfo';
import ButtonIcon from '../ButtonIcon';
import ImageWithPreview from '../ImageWithPreview';
import { StyledImageContent } from './styles';

interface ImageContentProps {
  priority?: boolean;
  image: ImageProps;
  onPhotoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  loading?: 'lazy' | 'eager';
}

const ImageContent = (props: ImageContentProps): React.ReactElement => {
  const { image, onPhotoClick, priority = false, loading } = props;
  const { makeContextualHref } = useContextualRouting();

  return (
    <div>
      <Link
        href={makeContextualHref({ id: image.id })}
        as={`/photos/${image.id}`}
        shallow={true}
        key={image.id}
        scroll={false}
      >
        <StyledImageContent onClick={onPhotoClick} className="relative block">
          <ImageWithPreview
            key={image.id}
            src={image.urls.regular}
            hash={image.blur_hash}
            width={image.width}
            height={image.height}
            color={image.color}
            layout="responsive"
            loading={loading}
            alt={image.alt_description}
            priority={priority}
          />
          <div className="content bg-opacity-40 bg-black text-white z-10">
            <div className="flex justify-between items-end w-full">
              <AvatarInfo image={image} />
              <ButtonIcon>
                <IoMdArrowDown size={24} />
              </ButtonIcon>
            </div>
          </div>
        </StyledImageContent>
      </Link>
    </div>
  );
};

export default ImageContent;
