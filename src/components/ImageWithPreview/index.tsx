import Image, { ImageProps } from 'next/image';
import BlurHash from '../BlurHash';

export type ImageWithPreviewProps = ImageProps & {
  hash: string;
};

const ImageWithPreview = (props: ImageWithPreviewProps): React.ReactElement => {
  const { hash, color, className, ...rest } = props;

  return (
    <div className={`h-full${className ? ` ${className}` : ''}`}>
      <div className="relative h-full">
        <Image color={color} className="z-10" {...rest} />
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor: color }}
        >
          {/* {hash && <BlurHash hash={hash} width="100%" height="100%" />} */}
        </div>
      </div>
    </div>
  );
};

export default ImageWithPreview;
