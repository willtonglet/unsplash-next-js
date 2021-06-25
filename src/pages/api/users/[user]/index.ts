import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Params = { [key: string]: string };

const getPhotos = async (user: string, params: Params) => {
  const { data } = await unsplash.get(`/napi/users/${user}`, {
    params,
  });
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { user } = req.query;
  const photo = await getPhotos(String(user), req.query as Params);
  res.status(200).json(photo);
};
