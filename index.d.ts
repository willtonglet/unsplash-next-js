/* eslint-disable camelcase */
declare module '*.svg' {
  const content: any;
  export default content;
}

interface Array<T> {
  flat(): Array<T>;
  flatMap(func: (x: T) => T): Array<T>;
}

interface ImageSizes {
  regular: string;
  full: string;
  small: string;
  thumb: string;
  medium: string;
  large: string;
  cover: string;
  raw: string;
}
interface UserProps {
  name: string;
  profile_image: ImageSizes;
  for_hire: boolean;
  username: string;
}

interface ImageProps {
  id: string;
  alt_description: string;
  color: string;
  urls: ImageSizes;
  width: number;
  height: number;
  user: UserProps;
  blur_hash: string;
  related_collections: {
    results: { id: string }[];
  };
  tags: { [key: string]: { [key: string]: string }; type: string }[];
}

interface Contributor {
  name: string;
  username: string;
  profile_image: {
    small: string;
  };
}

interface TopicProps {
  title: string;
  description: string;
  status: string;
  total_photos: number;
  owners: Contributor[];
  top_contributors: Contributor[];
}
interface PageProps {
  photos: ImageProps[];
  cover: ImageProps;
  trends: { title: string; id: string }[];
  topics: { title: string; slug: string; id: string }[];
  slug: string;
  topicInfo: TopicProps;
  results: { photos: number; collections: number; users: number };
  collections: { [key: string]: string }[];
  userInfo: {
    name: string;
    bio: string;
    location: string;
    portfolio_url: string;
    profile_image: {
      large: string;
    };
    tags: {
      custom: {
        source: {
          title: string;
        };
        title: string;
      }[];
    };
  };
}

type AutoCompleteParams = {
  query: string;
  priority: numger;
}[];
