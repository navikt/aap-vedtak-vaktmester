import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Ugyldig metode" });
  }
  if (req.method === "GET") {
    try {
      console.log(`Tpic-spørring mot ${process.env.NEXT_PUBLIC_API_URL}/topics}`);
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
      console.log(result);
      if (result.ok) {
        const data = await result.json();
        // return { ok: result.ok, data };
        res.status(res.statusCode).send(data);
      } else {
        console.error(`Topic-spørring feilet. HttpStatus: ${res.statusCode}. Message: ${res.statusMessage}`);
        // return { ok: result.ok, error: result.statusText };
        res.status(res.statusCode).send(result.statusText);
      }
    } catch (e) {
      console.error(`Topic-spørring feilet med en uhåndtert feil: ${e}`);
      res.status(500).send({ error: e });
      // return { error: `useFetchPOST: ${e}` };
    }
  }
};

export default handler;
