import Link from 'next/link';
import { IoMdArrowDown } from 'react-icons/io';
import { useContextualRouting } from '@hooks/useContextualRouting';
import AvatarInfo from '../AvatarInfo';
import ImageWithPreview from '../ImageWithPreview';
import HireLink from '../HireLink';
import { StyledImageContent } from './styles';

interface ImageContentProps {
  priority?: boolean;
  image: ImageProps;
  onPhotoClick?: React.MouseEventHandler<HTMLImageElement>;
  loading?: 'lazy' | 'eager';
}

const ImageContent = (props: ImageContentProps): React.ReactElement => {
  const { image, onPhotoClick, priority = false, loading } = props;
  const { makeContextualHref } = useContextualRouting();

  const renderImage = ({ href = '', as = '', scroll = true }) => (
    <StyledImageContent className="relative block group">
      <div className="content absolute bottom-0 left-0 w-full p-4 flex-col justify-end text-white z-20 hidden md:flex">
        <div className="flex justify-between items-end w-full">
          <AvatarInfo image={image}>
            {image.user.for_hire && <HireLink />}
          </AvatarInfo>
          <a
            href={`https://unsplash.com/photos/${image.id}/download?force=true`}
            className={`rounded bg-gray-200 h-9 w-10 flex justify-center items-center text-gray-500 hover:bg-white hover:text-gray-900`}
            rel="noreferrer"
            download
            target="_blank"
          >
            <IoMdArrowDown size={24} />
          </a>
        </div>
      </div>
      <div className="mb-3 px-3 md:hidden">
        <AvatarInfo image={image} />
      </div>
      <Link
        href={href}
        as={as || undefined}
        shallow={true}
        key={image.id}
        scroll={scroll}
      >
        <a className="relative block">
          <ImageWithPreview
            key={image.id}
            src={image.urls.regular}
            quality={80}
            hash={image.blur_hash}
            width={image.width}
            height={image.height}
            color={image.color}
            alt={image.alt_description}
            priority={priority}
            loading={loading}
            onClick={onPhotoClick}
            layout="responsive"
          />
          <div className="content absolute top-0 left-0 w-full h-full bg-opacity-40 bg-black hidden z-10 md:block" />
        </a>
      </Link>
    </StyledImageContent>
  );

  return (
    <>
      <div className="hidden md:block">
        {renderImage({
          href: makeContextualHref({ id: image.id }),
          as: `/photos/${image.id}`,
          scroll: false,
        })}
      </div>
      <div className="md:hidden">
        {renderImage({
          href: `/photos/${image.id}`,
        })}
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
