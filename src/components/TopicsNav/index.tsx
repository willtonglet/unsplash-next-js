import { useRouter } from 'next/router';
import Link from 'next/link';
import { StyledTopicsNav } from './styles';

interface TopicsNavProps {
  topics: { title: string; slug: string; id: string }[];
}

const TopicsNav = ({ topics }: TopicsNavProps): JSX.Element => {
  const router = useRouter();

  return (
    <StyledTopicsNav>
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
                } text-sm font-medium d-block py-4 hover:text-black focus:outline-none`}
              >
                {topic.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledTopicsNav>
  );
};

export default TopicsNav;
