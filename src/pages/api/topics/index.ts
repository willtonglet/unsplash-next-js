import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Params = { [key: string]: string };

const getPhoto = async (params: Params) => {
  const { data } = await unsplash.get(`/napi/topics`, {
    params,
  });
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const photo = await getPhoto(req.query as Params);
  res.status(200).json(photo);
};
