/* eslint-disable camelcase */
interface Array<T> {
  flat(): Array<T>;
  flatMap(func: (x: T) => T): Array<T>;
}

interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions,
  ) => RequestIdleCallbackHandle;
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
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
  photos: ImageProps[];
}

interface ImageProps extends TagProps {
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
}

interface TagProps {
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
  id: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  cover_photo: { urls: ImageSizes };
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
  collections: CollectionProps[];
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

interface CollectionProps extends TagProps {
  preview_photos: ImageProps[];
  id: string;
}

type AutoCompleteParams = {
  query: string;
  priority: numger;
}[];
