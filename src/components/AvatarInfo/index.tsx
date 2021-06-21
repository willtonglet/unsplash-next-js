import Image from 'next/image';
import HireLink from '@components/HireLink';

interface AvatarInfoProps {
  image: ImageProps;
}

const AvatarInfo = (props: AvatarInfoProps): React.ReactElement => {
  const { image } = props;
  return (
    <div className="flex items-center">
      <Image
        src={image.user.profile_image.medium}
        alt={image.user.name}
        height={36}
        width={36}
        className="overflow-hidden h-9 w-9 rounded-full"
      />
      <div className="flex flex-col ml-2">
        <span>{image.user.name}</span>
        {image.user.for_hire && <HireLink />}
      </div>
    </div>
  );
};

export default AvatarInfo;
