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
    <>
      <div>
        <Link
          href={makeContextualHref({ id: image.id })}
          as={`/photos/${image.id}`}
          shallow={true}
          key={image.id}
          scroll={false}
        >
          <StyledImageContent
            onClick={onPhotoClick}
            className="relative block group"
          >
            <div className="mb-3 px-3 md:hidden">
              <AvatarInfo image={image} />
            </div>
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
            <div className="content absolute top-0 left-0 w-full h-full p-4 flex-col justify-end bg-opacity-40 bg-black text-white z-10 hidden md:flex">
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
      {image.tags && image.tags.length && (
        <div className="mt-3">
          {image.tags?.map((tag, index) => (
            <Link
              key={index}
              href={
                tag.type === 'search'
                  ? `/s/photos/${tag.title}`
                  : `/images/${tag.title}`
              }
            >
              <a className="bg-gray-200 rounded text-sm text-gray-600 inline-block px-2 py-1 mr-2 mb-2 capitalize">
                {tag.type === 'search' ? tag.title : tag.source.title}
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageContent;
