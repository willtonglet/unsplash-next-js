import Image, { ImageProps } from 'next/image';
import Blurhash from '../BlurHash';

type ImageWithPreviewProps = ImageProps & {
  hash: string;
};

const ImageWithPreview = (props: ImageWithPreviewProps): React.ReactElement => {
  const { hash, color, className } = props;

  return (
    <div className={className}>
      <div className="relative flex">
        <Image {...props} className="z-10" />

        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor: color }}
        >
          <Blurhash hash={hash} width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ImageWithPreview;
