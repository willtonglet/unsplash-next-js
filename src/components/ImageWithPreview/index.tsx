import Image, { ImageProps } from 'next/image';

type ImageWithPreviewProps = ImageProps & { previewSrc?: string };

const ImageWithPreview = (props: ImageWithPreviewProps): JSX.Element => {
  const { src, width, height, alt, previewSrc } = props;

  if (src)
    return (
      <div className="relative flex">
        <Image {...props} className="z-10" />

        <div className="preview animate-pulse bg-gray-300 w-full h-full absolute top-0 left-0 overflow-hidden">
          <img
            src={previewSrc}
            className="w-full filter blur-xl"
            alt={`Preview - ${alt}`}
            width={width}
            height={height}
          />
        </div>
      </div>
    );

  return <></>;
};

export default ImageWithPreview;
