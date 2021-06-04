import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const getRelated = async (id: string) => {
  const { data } = await unsplash.get(`/napi/photos/${id}/related`);
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query;
  const getRelatedResults = await getRelated(String(id));
  res.status(200).json(getRelatedResults);
};
