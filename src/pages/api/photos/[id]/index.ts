import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const getPhoto = async (id: string) => {
  const { data } = await unsplash.get(`/napi/photos/${id}`);
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query;
  const photo = await getPhoto(String(id));
  res.status(200).json(photo);
};
