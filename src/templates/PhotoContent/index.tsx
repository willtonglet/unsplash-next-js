import { forwardRef, useEffect, useState } from 'react';
import { IoIosExpand } from 'react-icons/io';
import ImageWithPreview from '@components/ImageWithPreview';
import { StyledPhotoContent } from './styles';

interface PhotoContentProps {
  image: ImageProps;
}

const PhotoContent = forwardRef<HTMLDivElement, PhotoContentProps>(
  (props: PhotoContentProps, ref): React.ReactElement => {
    const { image } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const handleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
      setIsExpanded(false);
    }, [image]);

    return (
      <StyledPhotoContent
        ref={ref}
        isExpanded={isExpanded}
        className={
          (isExpanded && 'w-full') ||
          (image.width > image.height ? 'w-2/3' : 'w-1/3')
        }
      >
        <div
          role="button"
          tabIndex={0}
          className="wrapper relative flex-grow"
          onClick={handleExpand}
          onKeyPress={handleExpand}
        >
          <IoIosExpand
            size={24}
            className="absolute text-white top-4 right-4 z-20"
          />
          <ImageWithPreview
            src={isExpanded ? image.urls.full : image.urls.regular}
            hash={image.blur_hash}
            alt={image.alt_description}
            width={image.width}
            height={image.height}
            layout="responsive"
            priority
          />
        </div>
      </StyledPhotoContent>
    );
  },
);

PhotoContent.displayName = 'PhotoContent';
export default PhotoContent;
