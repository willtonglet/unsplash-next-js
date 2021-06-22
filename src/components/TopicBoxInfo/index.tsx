import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from '@core/utils/formatNumber';

interface TopicBoxInfoProps {
  topicInfo: TopicProps;
}

const TopicBoxInfo = ({ topicInfo }: TopicBoxInfoProps): React.ReactElement => {
  return (
    <dl className="rounded border border-gray-300 p-4 grid gap-2 grid-cols-topic-box-info">
      <dt className="flex items-center h-8">
        <svg
          width="18"
          height="18"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
          className="fill-current text-gray-300"
        >
          <path d="M16 2.7C8.7 2.7 2.7 8.7 2.7 16s6 13.3 13.3 13.3 13.3-6 13.3-13.3S23.3 2.7 16 2.7zm-.7 24v-8.3h-4.6l6.7-13v8.3h4.5l-6.6 13z"></path>
        </svg>
        <span className="text-sm ml-2">Status</span>
      </dt>
      <dd className="flex items-center h-8 justify-self-end">
        <div className="py-0.5 px-2 rounded flex items-center bg-green-200">
          <span className="block h-2 w-2 bg-green-500 rounded-full mr-1" />
          <span className="text-sm font-medium capitalize">
            {topicInfo.status}
          </span>
        </div>
      </dd>
      <hr className="col-start-1 col-end-3" />

      <dt className="flex items-center h-8">
        <svg
          width="18"
          height="18"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
          className="fill-current text-gray-300"
        >
          <path d="M16 2.7C8.6 2.7 2.7 8.6 2.7 16s6 13.3 13.3 13.3 13.3-6 13.3-13.3S23.4 2.7 16 2.7zm0 4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 18.9c-3.3 0-6.3-1.7-8-4.3 0-2.7 5.3-4.1 8-4.1s8 1.5 8 4.1c-1.7 2.6-4.7 4.3-8 4.3z"></path>
        </svg>
        <span className="text-sm ml-2">Curator</span>
      </dt>
      <dd className="flex items-center h-8 justify-self-end">
        <Link href={`/@${topicInfo.owners[0].username}`}>
          <a className="flex items-center h-7 w-7 rounded-full overflow-hidden relative">
            <Image
              src={topicInfo.owners[0].profile_image.small}
              layout="fill"
              alt={topicInfo.owners[0].name}
            />
          </a>
        </Link>
      </dd>
      <hr className="col-start-1 col-end-3" />

      <dt className="flex items-center h-8">
        <svg
          width="18"
          height="18"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
          className="fill-current text-gray-300"
        >
          <path d="M26.7 4H5.3C4.5 4 4 4.5 4 5.3v21.3c0 .9.5 1.4 1.3 1.4h21.3c.8 0 1.3-.5 1.3-1.3V5.3c.1-.8-.4-1.3-1.2-1.3zm-20 20l4.7-6 3.3 4 4.7-6 6 8H6.7z"></path>
        </svg>
        <span className="text-sm ml-2">Contributions</span>
      </dt>
      <dd className="flex items-center h-8 justify-self-end	">
        <span className="font-bold">
          {formatNumber(topicInfo.total_photos)}
        </span>
      </dd>
      <hr className="col-start-1 col-end-3" />

      <dt className="flex items-center h-8">
        <svg
          width="18"
          height="18"
          version="1.1"
          viewBox="0 0 32 32"
          aria-hidden="false"
          className="fill-current text-gray-300"
        >
          <path d="M30.67 22.67v4h-5.34v-4a6.21 6.21 0 00-3.1-5.16c3.68.49 8.44 2.25 8.44 5.16zM12 16a5.34 5.34 0 10-5.33-5.33A5.33 5.33 0 0012 16zm8 0a5.34 5.34 0 000-10.67 5.72 5.72 0 00-1.77.32 8 8 0 010 10A5.44 5.44 0 0020 16zm-8 1.33c-3.56 0-10.67 1.79-10.67 5.34v4h21.34v-4c0-3.55-7.11-5.34-10.67-5.34z"></path>
        </svg>
        <span className="text-sm ml-2">Top contributors</span>
      </dt>
      <dd className="flex items-center justify-self-end h-8">
        {topicInfo.top_contributors.map((c, i) => (
          <Link href={`/@${c.username}`} key={i}>
            <a className="flex items-center h-4 w-4 rounded-full overflow-hidden relative ml-2">
              <Image src={c.profile_image.small} layout="fill" alt={c.name} />
            </a>
          </Link>
        ))}
      </dd>
    </dl>
  );
};

export default TopicBoxInfo;
