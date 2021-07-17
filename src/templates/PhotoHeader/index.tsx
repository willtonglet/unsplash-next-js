import Link from 'next/link';
import AvatarInfo from '@components/AvatarInfo';
import HireLink from '@components/HireLink';

interface PhotoHeaderProps {
  photoData: ImageProps;
  className?: string;
  style?: React.CSSProperties;
}

const PhotoHeader = ({
  photoData,
  className,
  style,
}: PhotoHeaderProps): React.ReactElement => {
  return (
    <div className={className} style={style}>
      <div className="bg-white py-3 flex justify-between items-center">
        <AvatarInfo image={photoData} withHoverEffect={false}>
          {photoData.user.for_hire ? (
            <HireLink />
          ) : (
            <Link href={`/@${photoData.user.username}`}>
              <a className="text-xs text-gray-500 hover:text-gray-800">
                @{photoData.user.username}
              </a>
            </Link>
          )}
        </AvatarInfo>
        <a
          href={`https://unsplash.com/photos/${photoData.id}/download?force=true`}
          rel="noreferrer"
          download
          target="_blank"
          className="text-white rounded flex"
        >
          <span className="bg-green-500 rounded-l h-8 text-sm font-medium flex items-center px-3 hover:bg-green-600">
            Download free
          </span>
          <button
            aria-label="Download"
            className="bg-green-500 h-8 flex items-center px-1 border-l rounded-r hover:bg-green-600"
          >
            <svg
              width="24"
              height="24"
              version="1.1"
              viewBox="0 0 32 32"
              aria-hidden="false"
              className="fill-current text-white"
            >
              <path d="M9.9 11.5l6.1 6.1 6.1-6.1 1.9 1.9-8 8-8-8 1.9-1.9z"></path>
            </svg>
          </button>
        </a>
      </div>
    </div>
  );
};

export default PhotoHeader;
