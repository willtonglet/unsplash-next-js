import { unsplash } from '@core/middleware/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const getSearch = async (word: string) => {
  const { data } = await unsplash.get(`/nautocomplete/${word}`);
  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { word } = req.query;
  const getSearchResults = await getSearch(String(word));
  res.status(200).json(getSearchResults);
};
