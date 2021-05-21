import React from 'react';
import { StyledTopicsNav } from './styles';

interface TopicsNavProps {
  topics: { [key: string]: string }[];
}

const TopicsNav = ({ topics }: TopicsNavProps): JSX.Element => {
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
