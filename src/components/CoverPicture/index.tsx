import Picture, { PictureProps } from '@components/Picture';

const CoverPicture = ({ alt, src }: PictureProps): React.ReactElement => (
  <Picture
    alt={alt}
    loading="lazy"
    src={Array.from({ length: 30 }).map(
      (_, index) =>
        `${src}&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=${
          199 + index * 200
        }&h=${index === 0 ? 230 : index === 1 ? 310 : 594}`,
    )}
    customMq={Array.from({ length: 30 }).map((_, index) => index * 200)}
  />
);

export default CoverPicture;
