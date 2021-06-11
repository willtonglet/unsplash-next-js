import ContainerWrapper from '@components/ContainerWrapper';
import TopicBoxInfo from '@components/TopicBoxInfo';

interface TopicHeaderProps {
  topicInfo: TopicProps;
}

const TopicHeader = ({ topicInfo }: TopicHeaderProps): React.ReactElement => {
  return (
    <ContainerWrapper className="pt-12 mb-12">
      <div className="grid grid-cols-3">
        <div className="col-start-1 col-end-3 mt-4">
          <h2 className="capitalize text-5xl font-bold mb-6">
            {topicInfo.title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: topicInfo.description }}
            className="text-lg w-8/12"
          />
        </div>
        <TopicBoxInfo topicInfo={topicInfo} />
      </div>
    </ContainerWrapper>
  );
};

export default TopicHeader;
