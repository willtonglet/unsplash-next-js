import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Params = { [key: string]: string };

const getPhoto = async (slug: string, params: Params) => {
  const { data } = await unsplash.get(`/napi/topics/${slug}/photos`, {
    params,
  });
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { slug } = req.query;
  const photo = await getPhoto(String(slug), req.query as Params);
  res.status(200).json(photo);
};
