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
}
interface UserProps {
  name: string;
  profile_image: ImageSizes;
  for_hire: boolean;
}

interface ImageProps {
  id: string;
  alt_description: string;
  urls: ImageSizes;
  width: number;
  height: number;
  user: UserProps;
}
interface PageProps {
  topics: { title: string; id: string }[];
  trends: { title: string; id: string }[];
}
