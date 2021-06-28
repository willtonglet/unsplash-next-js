import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Params = { [key: string]: string };

const getPhotos = async (params: Params) => {
  const { data } = await unsplash.get(`/napi/collections`, {
    params,
  });
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const photos = await getPhotos(req.query as Params);
  res.status(200).json(photos);
};
