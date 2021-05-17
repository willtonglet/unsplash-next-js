import React from 'react';
import { StyledTopicsNav } from './styles';

interface Props {
  topics: { [key: string]: string }[];
}

const TopicsNav = ({ topics }: Props) => {
  return (
    <StyledTopicsNav>
      <ul>
        {topics.map((topic: any) => (
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
