import Image from 'next/image';
import { ImageProps } from '../../pages/_home';

interface ImageWithPreviewProps {
  image: ImageProps;
}

const ImageWithPreview = ({ image }: ImageWithPreviewProps) => {
  if (image)
    return (
      <div className="relative flex">
        <Image
          src={image.urls.regular}
          alt={image.alt_description}
          width={image.width}
          height={image.height}
          className="z-10"
        />

        <div className="preview animate-pulse bg-gray-300 w-full h-full absolute top-0 left-0 overflow-hidden">
          <img
            src={image.urls.thumb}
            className="w-full filter blur-xl"
            alt={`Preview - ${image?.alt_description}`}
            width={image.width}
            height={image.height}
          />
        </div>
      </div>
    );

  return <></>;
};

export default ImageWithPreview;
