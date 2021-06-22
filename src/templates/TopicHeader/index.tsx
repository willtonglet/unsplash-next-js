import ContainerWrapper from '@components/ContainerWrapper';
import TopicBoxInfo from '@components/TopicBoxInfo';

interface TopicHeaderProps {
  topicInfo: TopicProps;
}

const TopicHeader = ({ topicInfo }: TopicHeaderProps): React.ReactElement => {
  return (
    <ContainerWrapper className="pt-12 mb-12 px-4 md:px-6 lg:px-0">
      <div className="grid gap-x-6 grid-cols-topic-header">
        <div className="col-start-1 col-end-3">
          <h2 className="capitalize text-5xl font-bold mb-6">
            {topicInfo.title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: topicInfo.description }}
            className="text-lg lg:w-8/12"
          />
        </div>
        <div>
          <TopicBoxInfo topicInfo={topicInfo} />
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default TopicHeader;
