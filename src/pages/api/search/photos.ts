import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Params = { [key: string]: string };

const getSearch = async (params: Params) => {
  const { data } = await unsplash.get(`/napi/search/photos`, {
    params,
  });
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const getSearchResults = await getSearch(req.query as Params);
  res.status(200).json(getSearchResults);
};
