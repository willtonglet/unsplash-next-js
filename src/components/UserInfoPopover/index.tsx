import Image from 'next/image';
import Link from 'next/link';
import Popover from '@components/Popover';
import { useState } from 'react';
import { apiRoute } from '@core/middleware/api';
import { useEffect } from 'react';

interface UserInfoPopoverProps {
  user: PageProps['cover']['user'];
}

const UserInfoPopover = ({
  user,
}: UserInfoPopoverProps): React.ReactElement => {
  const [userPhotos, setUserPhotos] = useState<ImageProps[]>([]);

  const getUserPhotos = () =>
    apiRoute
      .get(`/users/${user.username}/photos`, {
        params: {
          per_page: 3,
          page: 1,
        },
      })
      .then(({ data }) => setUserPhotos(data));

  useEffect(() => {
    getUserPhotos();
  }, []);

  return (
    <Popover
      childrenToBeOpened={
        <div className="w-96 p-4">
          <div className="flex items-center">
            <Link href={`/@${user.username}`}>
              <a className="mr-3">
                <Image
                  src={user.profile_image.large}
                  quality={100}
                  width={56}
                  height={56}
                  alt={user.name}
                  className="rounded-full border"
                />
              </a>
            </Link>
            <div className="flex flex-col justify-center">
              <Link href={`/@${user.username}`}>
                <a className="text-lg block text-black font-bold leading-none">
                  <h3>{user.name}</h3>
                </a>
              </Link>
              <Link href={`/@${user.username}`}>
                <a className="text-sm text-gray-500">@{user.username}</a>
              </Link>
            </div>
          </div>
          <div className="flex my-3">
            {userPhotos.map((photo, i) => (
              <Link href={`/@${user.username}`} key={i}>
                <a className={i === 1 ? 'px-2' : 'p-0'}>
                  <Image
                    src={photo.urls.thumb}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt_description}
                  />
                </a>
              </Link>
            ))}
          </div>
          <Link href={`/@${user.username}`}>
            <a className="border border-gray-300 rounded p-1.5 block text-center font-medium text-gray-500 hover:text-gray-900 hover:border-gray-400">
              View Profile
            </a>
          </Link>
        </div>
      }
    >
      <Link href={`/@${user.username}`}>
        <a className="text-gray-300 hover:text-white">{user.name}</a>
      </Link>
    </Popover>
  );
};

export default UserInfoPopover;
