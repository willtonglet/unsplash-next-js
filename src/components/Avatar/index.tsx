import Image from 'next/image';
import Link from 'next/link';

interface AvatartProps {
  user: UserProps;
  height?: number;
  width?: number;
  className?: string;
}

const Avatar = ({
  user,
  height = 36,
  width = 36,
  className,
}: AvatartProps): React.ReactElement => {
  return (
    <Link href={`/@${user.username}`}>
      <a
        className={`flex items-center overflow-hidden rounded-full relative${
          className ? ` ${className}` : ''
        }`}
      >
        <Image
          src={user.profile_image.medium}
          alt={user.name}
          height={height}
          width={width}
          className="relative z-10"
        />
        <div className="absolute bg-gray-300 top-0 left-0 h-full w-full animate-pulse" />
      </a>
    </Link>
  );
};

export default Avatar;
