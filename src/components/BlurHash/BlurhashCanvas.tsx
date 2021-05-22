import React, { useEffect, useRef } from 'react';
import { decode } from 'blurhash';

type BlurhashCanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
};

const BlurhashCanvas = (props: BlurhashCanvasProps): JSX.Element => {
  const { hash, height = 128, width = 128, punch, ...rest } = props;

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      const pixels = decode(hash, width, height, punch);

      const ctx = canvas.current.getContext('2d');
      const imageData = ctx && ctx.createImageData(width, height);

      if (ctx && imageData) {
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, []);

  return <canvas {...rest} height={height} width={width} ref={canvas} />;
};

export default BlurhashCanvas;
