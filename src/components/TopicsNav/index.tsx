import { useRouter } from 'next/router';
import Link from 'next/link';
import NavigationScroller from '@components/NavigationScroller';

interface TopicsNavProps {
  topics: { title: string; slug: string; id: string }[];
}

const TopicsNav = ({ topics }: TopicsNavProps): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="px-5 shadow-md">
      <div className="flex items-center">
        <div
          className={`flex ${
            router.pathname === '/'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-transparent'
          }`}
        >
          <Link href="/" shallow={false}>
            <a
              className={`${
                router.pathname === '/' ? 'text-dark' : 'text-gray-500'
              } text-sm font-medium d-block py-4 hover:text-black focus:outline-none`}
            >
              Editorial
            </a>
          </Link>
        </div>
        <hr className="border-r h-8 border-gray-300 ml-5" />
        <NavigationScroller className="flex-grow min-w-0 pl-3">
          <ul className="flex">
            {topics.map((topic) => (
              <li
                key={topic.id}
                className={`flex mx-3 ${
                  router.query.slug === topic.slug
                    ? 'border-b-2	border-black'
                    : 'border-b-2	border-transparent'
                }`}
              >
                <Link href={`/t/${topic.slug}`} shallow={false}>
                  <a
                    className={`${
                      router.query.slug === topic.slug
                        ? 'text-dark'
                        : 'text-gray-500'
                    } text-sm font-medium d-block py-4 hover:text-black focus:outline-none truncate`}
                  >
                    {topic.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationScroller>
        <Link href={`/`} shallow={false}>
          <a className="text-sm text-gray-500 pl-3 flex whitespace-nowrap font-medium hover:text-black focus:outline-none">
            View all
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TopicsNav;
