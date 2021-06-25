import Link from 'next/link';
import UserInfoPopover from '@components/UserInfoPopover';
import Avatar from '@components/Avatar';
import RenderIfVisible from '@components/RenderIfVisible';

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
        <Avatar user={image.user} />
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
