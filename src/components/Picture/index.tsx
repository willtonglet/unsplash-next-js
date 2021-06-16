import React from 'react';
import { StyledPicture } from './styles';

export interface PictureProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string | string[];
  alt: string;
  loading?: 'eager' | 'lazy';
  customMq?: number[];
}

const Picture = (props: PictureProps): React.ReactElement => {
  const {
    src,
    alt,
    customMq = [0, 640, 768, 1024, 1280, 1536],
    ...rest
  } = props;
  const getImage = typeof src === 'object' ? src[0] : src;

  const renderSources = customMq
    .map((size, index) =>
      src[index] ? (
        index > 0 ? (
          <source
            key={index}
            srcSet={`${src[index]} 1x, ${src[index]} 2x`}
            media={`(min-width: ${size}px)`}
          />
        ) : (
          <source key={index} srcSet={`${src[0]} 1x, ${src[0]} 2x`} />
        )
      ) : null,
    )
    .reverse();

  return (
    <StyledPicture>
      {renderSources}
      <img
        role="presentation"
        src={getImage}
        alt={alt}
        decoding="async"
        {...rest}
      />
    </StyledPicture>
  );
};

export default React.memo(Picture);
