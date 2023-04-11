import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Ugyldig metode' });
  }
  const { pid } = req.query;
  if (req.method === 'POST') {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meldeplikt/${pid}`, {
        method: 'POST',
        body: req.body,
      });
      if (result.ok) {
        res.status(res.statusCode).end();
      } else {
        res.status(res.statusCode).json({ message: result.statusText });
      }
    } catch (e) {
      res.status(500).send({ error: e });
    }
  }
};

export default handler;
