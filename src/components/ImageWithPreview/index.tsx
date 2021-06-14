import { useBreakPoint } from '@hooks/useBreakPoint';
import Image, { ImageProps } from 'next/image';
import { useMemo } from 'react';
import Blurhash from '../BlurHash';

type Sizing = {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  wd?: string | number;
};

type ImageWithPreviewProps = Omit<ImageProps, 'src' | 'width' | 'height'> & {
  hash: string;
  src:
    | string
    | {
        [key: string]: string;
      };
  width: string | number | Sizing;
  height: string | number | Sizing;
};

const ImageWithPreview = (props: ImageWithPreviewProps): React.ReactElement => {
  const { hash, src, width, height, color, className, ...rest } = props;
  const breakpoint = useBreakPoint();
  const handleSizeObject = (size: Sizing): Sizing => ({
    xs: size.xs,
    sm: size.sm || size.xs,
    md: size.md || size.sm || size.xs,
    lg: size.lg || size.md || size.sm || size.xs,
    xl: size.xl || size.lg || size.md || size.sm || size.xs,
    wd: size.wd || size.xl || size.lg || size.md || size.sm || size.xs,
  });

  const getWidth = useMemo(
    () =>
      typeof width === 'object'
        ? (
            handleSizeObject(width) as unknown as {
              [key: string]: string | number;
            }
          )[breakpoint]
        : width,
    [breakpoint],
  );
  const getHeight = useMemo(
    () =>
      typeof height === 'object'
        ? (
            handleSizeObject(height) as unknown as {
              [key: string]: string | number;
            }
          )[breakpoint]
        : height,
    [breakpoint],
  );

  console.log(getWidth, getHeight, breakpoint);

  const renderImage =
    breakpoint &&
    (typeof src === 'object' ? (
      Object.keys(src).map((size, i) => (
        <div
          key={i}
          className={
            size === 'xs'
              ? `${Object.keys(src)[i + 1]}:hidden`
              : `hidden ${size}:block`
          }
        >
          <Image
            src={src[size]}
            width={getWidth}
            height={getHeight}
            color={color}
            className="z-10"
            layout="responsive"
            {...rest}
          />
        </div>
      ))
    ) : (
      <Image
        src={src}
        width={getWidth}
        height={getHeight}
        color={color}
        className="z-10"
        layout="responsive"
        {...rest}
      />
    ));

  return (
    <div className={className}>
      <div className="relative">
        {renderImage}
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{ backgroundColor: color }}
        >
          {hash && <Blurhash hash={hash} width="100%" height="100%" />}
        </div>
      </div>
    </div>
  );
};

export default ImageWithPreview;
