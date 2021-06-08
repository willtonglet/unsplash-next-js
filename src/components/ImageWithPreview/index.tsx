import Image, { ImageProps } from 'next/image';
import Blurhash from '../BlurHash';

type ImageWithPreviewProps = ImageProps & {
  hash: string;
  backgroundColor: string;
};

const ImageWithPreview = (props: ImageWithPreviewProps): React.ReactElement => {
  const { hash, backgroundColor, className } = props;

  return (
    <div className={className}>
      <div className="relative flex">
        <Image {...props} className="z-10" />

        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor }}
        >
          <Blurhash hash={hash} width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ImageWithPreview;
