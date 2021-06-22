import ContainerWrapper from '@components/ContainerWrapper';
import TopicBoxInfo from '@components/TopicBoxInfo';

import { StyledTopicHeader } from './styles';

interface TopicHeaderProps {
  topicInfo: TopicProps;
}

const TopicHeader = ({ topicInfo }: TopicHeaderProps): React.ReactElement => {
  return (
    <ContainerWrapper className="pt-16 mb-12 px-4 md:px-6 lg:px-0">
      <StyledTopicHeader className="grid gap-x-6">
        <div className="col-start-1 col-end-4 md:col-end-3 pb-12 md:pb-0">
          <h2 className="capitalize text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            {topicInfo.title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: topicInfo.description }}
            className="md:text-lg lg:w-8/12 info-text"
          />
        </div>
        <div className="col-start-1 col-end-4 md:col-start-3">
          <TopicBoxInfo topicInfo={topicInfo} />
        </div>
      </StyledTopicHeader>
    </ContainerWrapper>
  );
};

export default TopicHeader;
