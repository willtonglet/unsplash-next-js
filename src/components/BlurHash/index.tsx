import React from 'react';
import BlurhashCanvas from './BlurhashCanvas';

type BlurHashProps = React.HTMLAttributes<HTMLDivElement> & {
  hash: string;
  height?: number | string | 'auto';
  punch?: number;
  resolutionX?: number;
  resolutionY?: number;
  style?: React.CSSProperties;
  width?: number | string | 'auto';
};

const BlurHash = (props: BlurHashProps): JSX.Element => {
  const {
    hash,
    height = 128,
    width = 128,
    resolutionX = 32,
    resolutionY = 32,
    punch,
    style,
    ...rest
  } = props;

  return (
    <div
      {...rest}
      style={{
        display: 'inline-block',
        height,
        width,
        ...style,
        position: 'relative',
      }}
    >
      <BlurhashCanvas
        hash={hash}
        height={resolutionY}
        width={resolutionX}
        punch={punch}
        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
      />
    </div>
  );
};

export default BlurHash;
