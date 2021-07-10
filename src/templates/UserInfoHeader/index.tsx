import Link from 'next/link';
import Image from 'next/image';
import ContainerWrapper from '@components/ContainerWrapper';
import Tags from '@components/Tags';

interface UserInfoHeaderProps {
  userInfo: PageProps['userInfo'];
}

const UserInfoHeader = ({
  userInfo,
}: UserInfoHeaderProps): React.ReactElement => {
  return (
    <ContainerWrapper>
      <div className="flex pt-12">
        <div className="flex w-1/3 justify-end items-start pr-8">
          <Image
            src={userInfo.profile_image.large}
            quality={100}
            width={150}
            height={150}
            alt={userInfo.name}
            className="rounded-full"
          />
        </div>
        <div className="w-2/3 pb-8">
          <h2 className="text-4xl	font-bold mb-4">{userInfo.name}</h2>
          <p className="w-9/12 mb-5">{userInfo.bio}</p>
          {userInfo.location && (
            <Link href={`/s/photos/${userInfo.location.toLowerCase()}`}>
              <a className="flex items-center group text-gray-500 text-sm mb-1 hover:text-black">
                <svg
                  width="14"
                  height="14"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className="fill-current text-gray-500 group-hover:text-black"
                >
                  <path d="M16 2.66669C9.99998 2.66669 5.33331 7.06669 5.33331 12.6667C5.33331 19.8667 12.9333 27.0667 15.3333 29.0667C15.7333 29.4267 16.2666 29.4267 16.6666 29.0667C19.0666 27.0667 26.6666 19.8667 26.6666 12.6667C26.6666 7.06669 22 2.66669 16 2.66669ZM16 18.6667C13.0666 18.6667 10.6666 16.2667 10.6666 13.3334C10.6666 10.4 13.0666 8.00002 16 8.00002C18.9333 8.00002 21.3333 10.4 21.3333 13.3334C21.3333 16.2667 18.9333 18.6667 16 18.6667Z"></path>
                </svg>
                <span className="ml-1">{userInfo.location}</span>
              </a>
            </Link>
          )}
          {userInfo.portfolio_url && (
            <a
              href={userInfo.portfolio_url}
              className="flex items-center group text-gray-500 text-sm hover:text-black"
            >
              <svg
                width="14"
                height="14"
                version="1.1"
                viewBox="0 0 32 32"
                aria-hidden="false"
                className="fill-current text-gray-500 group-hover:text-black"
              >
                <path d="M16 2.66669C8.66669 2.66669 2.66669 8.66669 2.66669 16C2.66669 23.3334 8.66669 29.3334 16 29.3334C23.3334 29.3334 29.3334 23.3334 29.3334 16C29.3334 8.66669 23.3334 2.66669 16 2.66669ZM6.00002 16C6.00002 13.25 7.08335 10.75 8.91669 8.91669C8.91669 12.25 9.33335 13.5 11 15.1667C12.6667 16.8334 15.1667 19.75 15.1667 23.0834C15.1667 24.5834 15.5834 25.5834 16 26C10.5 26 6.00002 21.5 6.00002 16ZM19.5834 25.3334C20.9167 23.8334 22.5 21.4167 21.4167 19.3334C19.75 16 13.9167 18.5 13.9167 15.1667C13.9167 11.8334 19.3334 16 19.3334 9.33335C19.3334 6.91669 17.4167 6.16669 15.4167 6.00002H16C21.5 6.00002 26 10.5 26 16C26 20.25 23.3334 23.9167 19.5834 25.3334Z"></path>
              </svg>
              <span className="ml-1">
                {userInfo.portfolio_url.replace('https://', '')}
              </span>
            </a>
          )}
          {userInfo.tags.custom.length > 0 && (
            <>
              <h4 className="mt-5 mb-3">Interests</h4>
              <Tags tags={userInfo.tags.custom} />
            </>
          )}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default UserInfoHeader;
