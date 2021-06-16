import { useRouter } from 'next/router';
import Link from 'next/link';
import NavigationScroller from '@components/NavigationScroller';
import { formatNumber } from '@core/utils/formatNumber';

interface SearchTabsProps {
  results: {
    photos: number;
    collections: number;
    users: number;
  };
}

const SearchTabs = ({ results }: SearchTabsProps): React.ReactElement => {
  const router = useRouter();
  const handleIconColor = (route: string) =>
    `mr-2 fill-current group-hover:text-black ${
      router.pathname === route ? 'text-black' : 'text-gray-300'
    }`;

  return (
    <div className="bg-white border-b border-gray-300 sticky top-16 z-20">
      <NavigationScroller className="flex-grow min-w-0 pl-3">
        <ul className="flex">
          <li
            className={`flex mx-3 ${
              router.pathname === '/s/photos/[slug]'
                ? 'border-b-2	border-black'
                : 'border-b-2	border-transparent'
            }`}
          >
            <Link href={`/s/photos/${router.query.slug}`} shallow>
              <a
                className={`${
                  router.pathname === '/s/photos/[slug]'
                    ? 'text-dark'
                    : 'text-gray-500'
                } group flex items-center text-sm font-medium d-block py-4 hover:text-black focus:outline-none`}
              >
                <svg
                  width="16"
                  height="16"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className={handleIconColor('/s/photos/[slug]')}
                >
                  <path d="M26.7 4H5.3C4.5 4 4 4.5 4 5.3v21.3c0 .9.5 1.4 1.3 1.4h21.3c.8 0 1.3-.5 1.3-1.3V5.3c.1-.8-.4-1.3-1.2-1.3zm-20 20l4.7-6 3.3 4 4.7-6 6 8H6.7z"></path>
                </svg>
                Photos {formatNumber(results.photos)}
              </a>
            </Link>
          </li>
          <li
            className={`flex mx-3 ${
              router.pathname === '/s/collections/[slug]'
                ? 'border-b-2	border-black'
                : 'border-b-2	border-transparent'
            }`}
          >
            <Link href={`/s/collections/${router.query.slug}`} shallow>
              <a
                className={`${
                  router.pathname === '/s/collections/[slug]'
                    ? 'text-dark'
                    : 'text-gray-500'
                } group flex items-center text-sm font-medium d-block py-4 hover:text-black focus:outline-none`}
              >
                <svg
                  width="16"
                  height="16"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className={handleIconColor('/s/collections/[slug]')}
                >
                  <path d="M1.85543 9.96868C6.21534 11.9994 10.6257 14.0483 15.0039 16.0607c.3098.1714.6581.2613 1.0122.2613.3541 0 .7024-.0899 1.0121-.2613 4.3599-1.9941 8.7565-4.0613 13.0797-6.07373.2473-.11892.5588-.18294.5588-.5031 0-.32015-.3115-.41162-.5588-.52139-4.3232-2.02154-8.7748-4.11625-13.1163-6.12864-.6093-.21642-1.2736-.22286-1.8869-.0183-4.3966 2.03069-8.88936 4.1254-13.26759 6.17438-.21067.10062-.50378.18295-.50378.47566s.29311.40248.5221.5031zm17.43517.65862V6.84032l7.41 2.10387-10.68 4.96691V9.58449l3.27 1.04281zM27.8501 20.8539c-.327-.158-.6856-.24-1.0488-.24-.3632 0-.7218.082-1.0488.24l-8.6832 4.0613c-.3326.1666-.6995.2534-1.0716.2534-.3721 0-.7391-.0868-1.0717-.2534l-8.71066-4.0247c-.33699-.1628-.70648-.2474-1.08082-.2474-.37434 0-.74383.0846-1.08082.2474-.71444.3476-1.4472.686-2.1708 1.0245-.23814.1189-.54957.1829-.54957.5031 0 .3201.31143.4116.54041.5213.22899.1098 12.78016 5.9501 13.09806 6.1012.3179.1511.6764.25 1.0259.2927.3788-.0358.7281-.1478 1.0625-.3293.3343-.1814 13.374-6.2655 13.4278-6.2932.0538-.0277.099-.0697.1305-.1213.0315-.0517.0482-.111.0482-.1714 0-.0605-.0167-.1198-.0482-.1715-.0315-.0516-.0767-.0936-.1305-.1213-.0538-.0277-2.3109-1.1135-2.6379-1.2714z"></path>
                  <path d="M27.8501 14.46c-.327-.158-.6856-.24-1.0488-.24-.3632 0-.7218.082-1.0488.24l-8.6832 4.0613c-.3326.1666-.6995.2533-1.0716.2533-.3721 0-.7391-.0867-1.0717-.2533l-8.71066-4.0247c-.33699-.1628-.70648-.2474-1.08082-.2474-.37434 0-.74383.0846-1.08082.2474-.71444.3476-1.4472.686-2.1708 1.0244-.23815.119-.54957.183-.54957.5031 0 .3202.31142.4117.54041.5214.22899.1098 12.78016 5.9501 13.09806 6.1012.3179.1511.6764.25 1.0259.2927.3788-.0358.7281-.1478 1.0625-.3293.3343-.1814 13.374-6.2655 13.4278-6.2932.0538-.0277.099-.0697.1305-.1213.0315-.0517.0482-.111.0482-.1715 0-.0604-.0167-.1197-.0482-.1714-.0315-.0516-.0767-.0936-.1305-.1213-.0538-.0277-2.3109-1.1135-2.6379-1.2714z"></path>
                </svg>
                Collections {formatNumber(results.collections)}
              </a>
            </Link>
          </li>
          <li
            className={`flex mx-3 ${
              router.pathname === '/s/users/[slug]'
                ? 'border-b-2	border-black'
                : 'border-b-2	border-transparent'
            }`}
          >
            <Link href={`/s/users/${router.query.slug}`} shallow>
              <a
                className={`${
                  router.pathname === '/s/users/[slug]'
                    ? 'text-dark'
                    : 'text-gray-500'
                } group flex items-center text-sm font-medium d-block py-4 hover:text-black focus:outline-none`}
              >
                <svg
                  width="16"
                  height="16"
                  version="1.1"
                  viewBox="0 0 32 32"
                  aria-hidden="false"
                  className={handleIconColor('/s/users/[slug]')}
                >
                  <path d="M30.67 22.67v4h-5.34v-4a6.21 6.21 0 00-3.1-5.16c3.68.49 8.44 2.25 8.44 5.16zM12 16a5.34 5.34 0 10-5.33-5.33A5.33 5.33 0 0012 16zm8 0a5.34 5.34 0 000-10.67 5.72 5.72 0 00-1.77.32 8 8 0 010 10A5.44 5.44 0 0020 16zm-8 1.33c-3.56 0-10.67 1.79-10.67 5.34v4h21.34v-4c0-3.55-7.11-5.34-10.67-5.34z"></path>
                </svg>
                Users {formatNumber(results.users)}
              </a>
            </Link>
          </li>
        </ul>
      </NavigationScroller>
    </div>
  );
};

export default SearchTabs;
