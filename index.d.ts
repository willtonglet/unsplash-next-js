/* eslint-disable camelcase */
declare module '*.svg' {
  const content: any;
  export default content;
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
interface PageProps {
  photos: ImageProps[];
  cover: ImageProps;
  trends: { title: string; id: string }[];
  topics: { title: string; slug: string; id: string }[];
  slug: string;
}

type AutoCompleteParams = {
  query: string;
  priority: numger;
}[];
