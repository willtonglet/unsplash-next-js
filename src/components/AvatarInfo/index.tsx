import React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

interface AvatarInfoProps {
  image: ImageProps;
}

const AvatarInfo = (props: AvatarInfoProps): React.ReactElement => {
  const { image } = props;

  return (
    <div className="flex items-center">
      <img
        src={image.user.profile_image.medium}
        alt={image.user.name}
        className="overflow-hidden h-9 w-9 rounded-full"
      />
      <div className="flex flex-col ml-2">
        <span>{image.user.name}</span>
        {image.user.for_hire && (
          <div className="flex items-center">
            <span className="text-xs font-light">Available for hire</span>
            <IoMdCheckmarkCircleOutline size={12} className="ml-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AvatarInfo);
