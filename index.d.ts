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
    results: CollectionProps[];
    total: number;
  };
  views: number;
  downloads: number;
  created_at: string;
  exif: {
    aperture: string;
    exposure_time: string;
    focal_length: string;
    iso: number;
    make: string;
    model: string;
  };
}

interface StatisticsParams {
  downloads: StatisticsCounterParams;
  views: StatisticsCounterParams;
}

interface StatisticsCounterParams {
  total: number;
  historical: {
    change: number;
  };
}

interface TagProps {
  tags: { type: string; title: string; source: { title: string } }[];
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
  cover_photo: ImageProps;
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
    tags: { custom: TagProps['tags'] };
  };
  searchListData: SearchListDataParams;
}

interface SearchListDataParams {
  topics: TopicProps[];
  collections: CollectionProps[];
  popular: string[];
}

interface CollectionProps extends TagProps {
  preview_photos: ImageProps[];
  id: string;
  title: string;
  total_photos: number;
  name: string;
  slug: string;
}

type AutoCompleteParams = {
  query: string;
  priority: numger;
}[];

interface ResultsProps {
  photos: number;
  collections: number;
  users: number;
}
