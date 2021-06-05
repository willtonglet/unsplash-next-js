import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { apiRoute } from '@core/middleware/api';
import Link from 'next/link';
import { StyledTopicsNav } from './styles';

const TopicsNav = (): JSX.Element => {
  const [topics, setTopics] = useState<{ [key: string]: string }[]>([]);
  const router = useRouter();

  const getTopics = async () => {
    const { data } = await apiRoute.get('/topics', {
      params: {
        per_page: 25,
      },
    });
    setTopics(data);
  };

  useEffect(() => {
    getTopics();
  }, []);

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
            <Link href={`/t/${topic.slug}`}>
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
