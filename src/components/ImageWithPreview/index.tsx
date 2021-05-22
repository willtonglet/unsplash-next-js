import Image, { ImageProps } from 'next/image';
import Blurhash from '../BlurHash';

type ImageWithPreviewProps = ImageProps & { hash: string };

const ImageWithPreview = (props: ImageWithPreviewProps): JSX.Element => {
  const { src, hash, className } = props;

  if (src)
    return (
      <div className={`relative flex ${className}`}>
        <Image {...props} className="z-10" />
        <div className="w-full h-full absolute top-0 left-0">
          <Blurhash hash={hash} width="100%" height="100%" />
        </div>
      </div>
    );

  return <></>;
};

export default ImageWithPreview;
