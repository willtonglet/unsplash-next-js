import { apiRoute } from '@core/middleware/api';
import React, { useEffect, useState } from 'react';
import { StyledTopicsNav } from './styles';

const TopicsNav = (): JSX.Element => {
  const [topics, setTopics] = useState<{ [key: string]: string }[]>([]);

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
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <span className="text-gray-500 text-sm font-medium hover:text-black">
              {topic.title}
            </span>
          </li>
        ))}
      </ul>
    </StyledTopicsNav>
  );
};

export default TopicsNav;
