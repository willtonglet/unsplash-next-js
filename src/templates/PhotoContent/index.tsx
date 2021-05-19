import Image from 'next/image';
import { ImageProps } from '../../pages/_home';

interface PhotoContentProps {
  image: ImageProps;
  className?: string;
}

const PhotoContent = (props: PhotoContentProps) => {
  const { image, className } = props;
  return (
    <Image
      src={image.urls.regular}
      alt={image.alt_description}
      width={image.width / 10}
      height={image.height / 10}
      className={className}
    />
  );
};

export default PhotoContent;
