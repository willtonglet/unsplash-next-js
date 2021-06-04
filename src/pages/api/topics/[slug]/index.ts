import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const getPhoto = async (slug: string) => {
  const { data } = await unsplash.get(`/napi/topics/${slug}`);
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { slug } = req.query;
  const photo = await getPhoto(String(slug));
  res.status(200).json(photo);
};
