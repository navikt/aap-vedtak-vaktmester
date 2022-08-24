import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Ugyldig metode" });
  }
  if (req.method === "GET") {
    try {
      console.log("Topic-spørring");
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`);
      if (result.ok) {
        const data = await result.json();
        return { ok: result.ok, data };
      } else {
        console.error(`Topic-spørring feilet. HttpStatus: ${res.status}. Message: ${res.statusMessage}`);
        return { ok: result.ok, error: result.statusText };
      }
    } catch (e) {
      console.error(`Topic-spørring feilet med en uhåndtert feil: ${e}`);
      return { error: `useFetchPOST: ${e}` };
    }
  }
};

export default handler;
