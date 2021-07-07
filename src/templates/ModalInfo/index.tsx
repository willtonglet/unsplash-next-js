import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import Modal from '@components/Modal';
import { useContextualRouting } from '@hooks/useContextualRouting';
import { ModalPhotosNavigationContext } from '@components/ModalPhotosNavigation/ModalPhotosNavigationContext';
import { numberWithCommas } from '@core/utils/numberWithCommas';
import { apiRoute } from '@core/middleware/api';
import { StyledBackground } from './styles';
import Skeleton from '@components/Skeleton';

interface ModalInfoProps {
  infoData: ImageProps;
}

const ModalInfo = ({ infoData }: ModalInfoProps): React.ReactElement => {
  const [statistics, setStatistics] = useState<StatisticsParams>();
  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();
  const { isModalOpen } = useContext(ModalPhotosNavigationContext);
  const published = new Date(infoData.created_at);
  const isUrlToOpen = router.asPath.includes(`/photos/${infoData.id}/info`);

  const countSkeleton = (
    <>
      <Skeleton.String size={2} height={1.4} className="mt-2.5 mb-2" />
      <Skeleton.String size={3} height={0.5} minWidth={30} />
    </>
  );

  const getStatistics = () =>
    apiRoute
      .get(`/photos/${infoData.id}/statistics`)
      .then((response) => setStatistics(response.data));

  useEffect(() => {
    if (isUrlToOpen) getStatistics();
  }, [isUrlToOpen]);

  return (
    <Modal
      isOpen={isUrlToOpen}
      onClose={() =>
        router.push(
          isModalOpen
            ? makeContextualHref({ id: router.query.id })
            : `/photos/${router.query.id}`,
          isModalOpen ? `/photos/${router.query.id}` : undefined,
          {
            shallow: true,
            scroll: false,
          },
        )
      }
    >
      <StyledBackground backgroundImage={infoData.urls.regular}>
        <div className="px-6 pt-6 pb-4">
          <h3 className="text-2xl">Info</h3>
          <span className="text-xs">
            Published on{' '}
            {`${published.toLocaleString('default', {
              month: 'long',
            })} ${published.getDate()}, ${published.getFullYear()}`}
          </span>
        </div>
        <dl className="flex p-4">
          <div className="flex-1 p-2">
            <dt className="flex items-center">
              <svg
                width="14"
                height="14"
                version="1.1"
                viewBox="0 0 32 32"
                aria-hidden="false"
              >
                <path d="M31.8 15.1l-.2-.4c-3.5-6.9-9.7-11.5-15.6-11.5-6.3 0-12.3 4.5-15.7 11.7l-.2.4c-.2.5-.2 1.1 0 1.6l.2.4c3.6 7 9.7 11.5 15.6 11.5 6.3 0 12.3-4.5 15.6-11.6l.2-.4c.4-.5.4-1.2.1-1.7zm-2 1.2c-3 6.5-8.3 10.5-13.8 10.5-5.2 0-10.6-4.1-13.8-10.4l-.2-.4.1-.3c3.1-6.5 8.4-10.5 13.9-10.5 5.2 0 10.6 4.1 13.8 10.4l.2.4-.2.3zm-13.8-6.6c-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3-2.8-6.3-6.3-6.3zm0 10.6c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"></path>
              </svg>
              <span className="text-xs font-medium ml-1.5">Views</span>
            </dt>
            <dd>
              {statistics?.views.total ? (
                <>
                  <span className="text-2xl">
                    {numberWithCommas(statistics.views.total)}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    +{numberWithCommas(statistics?.views.historical.change)}{' '}
                    since last month
                  </span>
                </>
              ) : (
                countSkeleton
              )}
            </dd>
          </div>
          <div className="flex-1 p-2">
            <dt className="flex items-center">
              <svg
                width="14"
                height="14"
                version="1.1"
                viewBox="0 0 32 32"
                aria-hidden="false"
              >
                <path d="M31.8 15.1l-.2-.4c-3.5-6.9-9.7-11.5-15.6-11.5-6.3 0-12.3 4.5-15.7 11.7l-.2.4c-.2.5-.2 1.1 0 1.6l.2.4c3.6 7 9.7 11.5 15.6 11.5 6.3 0 12.3-4.5 15.6-11.6l.2-.4c.4-.5.4-1.2.1-1.7zm-2 1.2c-3 6.5-8.3 10.5-13.8 10.5-5.2 0-10.6-4.1-13.8-10.4l-.2-.4.1-.3c3.1-6.5 8.4-10.5 13.9-10.5 5.2 0 10.6 4.1 13.8 10.4l.2.4-.2.3zm-13.8-6.6c-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3-2.8-6.3-6.3-6.3zm0 10.6c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"></path>
              </svg>
              <span className="text-xs font-medium ml-1.5">Downloads</span>
            </dt>
            <dd>
              {statistics?.downloads.total ? (
                <>
                  <span className="text-2xl">
                    {numberWithCommas(statistics.downloads.total)}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    +{numberWithCommas(statistics.downloads.historical.change)}{' '}
                    since last month
                  </span>
                </>
              ) : (
                countSkeleton
              )}
            </dd>
          </div>
          <div className="flex-1 p-2" />
        </dl>
        <hr className="mx-6 my-2" />
        <dl className="flex flex-wrap p-4">
          {infoData.exif.make && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">Camera Make</dt>
              <dd>{infoData.exif.make}</dd>
            </div>
          )}
          {infoData.exif.model && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">Camera Model</dt>
              <dd>{infoData.exif.model}</dd>
            </div>
          )}
          {infoData.exif.focal_length && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">Focal Length</dt>
              <dd>{infoData.exif.focal_length}</dd>
            </div>
          )}
          {infoData.exif.aperture && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">Aperture</dt>
              <dd>ƒ/{infoData.exif.aperture}</dd>
            </div>
          )}
          {infoData.exif.exposure_time && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">Shutter Speed</dt>
              <dd>{infoData.exif.exposure_time}s</dd>
            </div>
          )}
          {infoData.exif.iso && (
            <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
              <dt className="text-xs text-gray-500">ISO</dt>
              <dd>{infoData.exif.iso}</dd>
            </div>
          )}
          <div className="flex-grow p-2" style={{ flexBasis: 160 }}>
            <dt className="text-xs text-gray-500">Dimensions</dt>
            <dd>
              {infoData.width} x {infoData.height}
            </dd>
          </div>
        </dl>
      </StyledBackground>
    </Modal>
  );
};

export default ModalInfo;
