import { useRouter } from 'next/router';
import ModalInfo from '@templates/ModalInfo';
import { numberWithCommas } from '@core/utils/numberWithCommas';
import { useContextualRouting } from '@hooks/useContextualRouting';

interface PhotoInfoProps {
  photoInfo: ImageProps;
}

const PhotoInfo = ({ photoInfo }: PhotoInfoProps): React.ReactElement => {
  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();
  return (
    <div className="flex justify-between px-4 my-6">
      <div className="flex">
        <div className="w-48">
          <h3 className="text-sm text-gray-500">Views</h3>
          <span>{numberWithCommas(photoInfo.views)}</span>
        </div>
        <div className="w-48">
          <h3 className="text-sm text-gray-500">Downloads</h3>
          <span>{numberWithCommas(photoInfo.downloads)}</span>
        </div>
      </div>

      <button
        onClick={() =>
          router.push(
            makeContextualHref({ id: router.query.id }),
            `/photos/${router.query.id}/info`,
            { shallow: true, scroll: false },
          )
        }
        className="border border-gray-300 rounded h-8 px-3 flex items-center group text-gray-500 hover:border-gray-500 hover:text-black"
      >
        <svg
          width="14"
          height="14"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
          className="fill-current group-hover:text-black"
        >
          <path d="M16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm2 25c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-12c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v12zm0-16c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2z"></path>
        </svg>
        <span className="text-sm font-medium ml-2">Info</span>
      </button>

      <ModalInfo infoData={photoInfo} />
    </div>
  );
};

export default PhotoInfo;
