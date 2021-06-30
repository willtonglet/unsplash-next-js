import { connectToDatabase } from '@core/config/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { db, client } = await connectToDatabase();

  let popularWords = [{ word: { word: '' } }];

  if (client.isConnected()) {
    popularWords = await db.collection('popular-words').find({}).toArray();

    if (req.method === 'POST') {
      db.collection('popular-words').insertOne(req.body, (err, data) => {
        if (err) return console.log(err);
        res.send('saved to db: ' + data);
      });
    } else {
      const unique = [...new Set(popularWords.map((word) => word.word))];
      const popularWordsWithCount = unique
        .map((word) => ({
          word,
          count: Number(
            popularWords?.filter((str) => str.word === word).length,
          ),
        }))
        .sort((a, b) => b.count - a.count)
        .filter((_, i) => i < 5);

      return res.json(popularWordsWithCount);
    }
  }
};
