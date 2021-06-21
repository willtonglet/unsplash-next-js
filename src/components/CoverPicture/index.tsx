import BlurHash from '@components/BlurHash';
import Picture, { PictureProps } from '@components/Picture';

type CoverPictureProps = PictureProps & {
  color?: string;
  hash: string;
};

const CoverPicture = ({
  alt,
  src,
  color = '#FFFFFF',
  hash,
}: CoverPictureProps): React.ReactElement => (
  <>
    <Picture
      alt={alt as string}
      priority
      src={Array.from({ length: 20 }).map(
        (_, index) =>
          `${src}&ixlib=rb-1.2.1&dpr=2&auto=70%2Ccompress&fit=crop&w=${
            199 + index * 200
          }&h=${index === 0 ? 130 : index === 1 ? 310 : 594}`,
      )}
      customMq={Array.from({ length: 20 }).map((_, index) => index * 200)}
      className="relative z-10"
    />
    <div
      className="w-full h-full absolute top-0 left-0"
      style={{ backgroundColor: color }}
    >
      <BlurHash hash={hash} height="100%" width="100%" />
    </div>
  </>
);

export default CoverPicture;
