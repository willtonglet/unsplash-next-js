import { api } from '@core/middleware/api';
import { NextApiRequest, NextApiResponse } from 'next';

const coverParams = '&auto=format%2Ccompress&fit=crop&w=1680&h=680';

const getCover = async () => {
  const { data } = await api.get('/photos/random', {
    params: {
      orientation: 'landscape',
    },
  });
  return data;
};

const InjectCoverPhoto = async () => {
  const cover = await getCover();
  const urls = { ...cover.urls, cover: cover.urls.full + coverParams };
  return { ...cover, urls };
};

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const photos = await InjectCoverPhoto();
  try {
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
