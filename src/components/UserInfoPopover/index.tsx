import Link from 'next/link';
import { useState, useEffect } from 'react';
import Popover from '@components/Popover';
import { apiRoute } from '@core/middleware/api';
import ImageWithPreview from '@components/ImageWithPreview';
import Avatar from '@components/Avatar';

interface UserInfoPopoverProps {
  user: PageProps['cover']['user'];
  children: React.ReactNode;
}

const UserInfoPopover = ({
  user,
  children,
}: UserInfoPopoverProps): React.ReactElement => {
  const [userPhotos, setUserPhotos] = useState<ImageProps[]>([]);
  const [callApi, setCallApi] = useState(false);

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
    if (callApi) getUserPhotos();
  }, [callApi]);

  return (
    <Popover
      childrenToBeOpened={
        <div className="w-max p-4">
          <div className="flex items-center">
            <Avatar user={user} width={56} height={56} className="mr-3" />
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
          <div className="flex mt-3 mb-4">
            {userPhotos.map((photo, i) => (
              <Link href={`/@${user.username}`} key={i}>
                <a className={i === 1 ? 'px-2' : 'p-0'}>
                  <ImageWithPreview
                    hash={photo.blur_hash}
                    src={`${photo.urls.raw}&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=120&h=70`}
                    width={100}
                    height={70}
                    alt={photo.alt_description}
                  />
                </a>
              </Link>
            ))}
          </div>
          <Link href={`/@${user.username}`}>
            <a className="border border-gray-300 rounded p-1.5 text-sm block text-center font-medium text-gray-500 hover:text-gray-900 hover:border-gray-400">
              View Profile
            </a>
          </Link>
        </div>
      }
    >
      <div onMouseEnter={() => setCallApi(true)}>{children}</div>
    </Popover>
  );
};

export default UserInfoPopover;
