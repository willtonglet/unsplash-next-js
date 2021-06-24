import Image from 'next/image';
import Link from 'next/link';
import UserInfoPopover from '@components/UserInfoPopover';

interface AvatarInfoProps {
  image: ImageProps;
  children?: React.ReactNode;
  withHoverEffect?: boolean;
}

const AvatarInfo = (props: AvatarInfoProps): React.ReactElement => {
  const { image, children, withHoverEffect = true } = props;
  return (
    <div className="flex items-center">
      <UserInfoPopover user={image.user}>
        <Link href={`/@${image.user.username}`}>
          <a className="flex items-center">
            <Image
              src={image.user.profile_image.medium}
              alt={image.user.name}
              height={36}
              width={36}
              className="overflow-hidden h-9 w-9 rounded-full"
            />
          </a>
        </Link>
      </UserInfoPopover>

      <div className="flex flex-col ml-2">
        <UserInfoPopover user={image.user}>
          <Link href={`/@${image.user.username}`}>
            <a
              className={
                withHoverEffect
                  ? 'text-gray-300 hover:text-white'
                  : 'text-black'
              }
            >
              {image.user.name}
            </a>
          </Link>
        </UserInfoPopover>
        {children}
      </div>
    </div>
  );
};

export default AvatarInfo;
