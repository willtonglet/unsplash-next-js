import { apiRoute, unsplash } from '@core/middleware/api';

const getTopics = async () => {
  const { data } = await unsplash.get(`/napi/topics`, {
    params: {
      order_by: 'featured',
      per_page: 5,
    },
  });
  return { data };
};

const getCollections = async () => {
  const { data } = await unsplash.get(`/napi/collections`, {
    params: {
      per_page: 5,
    },
  });
  return { data };
};

const getPopularWords = async () => {
  const { data } = await apiRoute.get(`/search/popular-words`);
  return { data: data.map((word: { word: string }) => word.word) };
};

export const getSearchParams = async (): Promise<{
  data: {
    topics: TopicProps[];
    collections: CollectionProps[];
    popular: string[];
  };
}> => {
  const { data: topics } = await getTopics();
  const { data: collections } = await getCollections();
  const { data: popular } = await getPopularWords();

  return {
    data: { topics, collections, popular },
  };
};
