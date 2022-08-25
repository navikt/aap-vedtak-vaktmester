import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Ugyldig metode" });
  }
  if (req.method === "GET") {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
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
