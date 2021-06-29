import Link from 'next/link';
import { useState, useEffect } from 'react';
import Popover from '@components/Popover';
import { apiRoute } from '@core/middleware/api';
import ImageWithPreview from '@components/ImageWithPreview';
import Avatar from '@components/Avatar';
import Spinner from '@components/Spinner';

interface UserInfoPopoverProps {
  user: UserProps;
  children: React.ReactNode;
}

const UserInfoPopover = ({
  user,
  children,
}: UserInfoPopoverProps): React.ReactElement => {
  const [userData, setUserData] = useState<UserProps>();
  const [callApi, setCallApi] = useState(false);

  const getuserData = () =>
    apiRoute
      .get(`/users/${user.username}`, {
        params: {
          per_page: 3,
          page: 1,
        },
      })
      .then(({ data }) => setUserData(data));

  useEffect(() => {
    if (callApi) getuserData();
  }, [callApi]);

  return (
    <Popover
      childrenToBeOpened={
        <div
          className="p-4 relative"
          style={{ minWidth: '21.5rem', minHeight: '14rem' }}
        >
          {userData ? (
            <>
              <div className="flex items-center">
                <Avatar
                  user={userData}
                  width={56}
                  height={56}
                  className="mr-3"
                />
                <div className="flex flex-col justify-center">
                  <Link href={`/@${user.username}`}>
                    <a className="text-lg block text-black font-bold leading-none">
                      <h3 className="truncate">{user.name}</h3>
                    </a>
                  </Link>
                  <Link href={`/@${user.username}`}>
                    <a className="text-sm text-gray-500">@{user.username}</a>
                  </Link>
                </div>
              </div>
              <div className="flex mt-3 mb-4">
                {userData?.photos.map((photo, i) => (
                  <Link href={`/@${user.username}`} key={i}>
                    <a className={i === 1 ? 'px-2' : 'p-0'}>
                      <ImageWithPreview
                        hash={photo.blur_hash}
                        src={`${photo.urls.raw}&ixlib=rb-1.2.1&dpr=2&auto=format%2Ccompress&fit=crop&w=120&h=70`}
                        width={110}
                        height={70}
                        alt={photo.alt_description}
                      />
                    </a>
                  </Link>
                ))}
              </div>
              <Link href={`/@${user.username}`}>
                <a className="border shadow border-gray-300 rounded p-1.5 text-sm block text-center font-medium text-gray-500 hover:text-gray-900 hover:border-gray-400">
                  View Profile
                </a>
              </Link>
            </>
          ) : (
            <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      }
    >
      <div onMouseEnter={() => setCallApi(true)}>{children}</div>
    </Popover>
  );
};

export default UserInfoPopover;
