import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Ugyldig metode' });
    return;
  }
  if (req.method === 'GET') {
    const { topic } = req.query;
    if (!topic || topic.length != 2) {
      res.status(400).json({ message: 'Ugyldig antall parametre' });
      return;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topic/${topic[0]}/${topic[1]}`);
      if (result.ok) {
        const data = await result.json();
        res.status(res.statusCode).send(data);
      } else {
        res.status(res.statusCode).json({ message: result.statusText });
      }
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
};

export default handler;
