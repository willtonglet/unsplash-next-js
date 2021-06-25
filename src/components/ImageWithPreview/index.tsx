import Image, { ImageProps } from 'next/image';

export type ImageWithPreviewProps = ImageProps & {
  hash: string;
};

const ImageWithPreview = (props: ImageWithPreviewProps): React.ReactElement => {
  const { color, className, ...rest } = props;

  return (
    <div className={`h-full${className ? ` ${className}` : ''}`}>
      <div className="relative h-full">
        <Image color={color} className="z-10" {...rest} />
        {/* <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor: color }}
        /> */}
      </div>
    </div>
  );
};

export default ImageWithPreview;
