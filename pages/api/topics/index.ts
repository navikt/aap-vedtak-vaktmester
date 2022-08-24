import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Ugyldig metode" });
  }
  if (req.method === "GET") {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`);
      if (result.ok) {
        const data = await result.json();
        return { ok: result.ok, data };
      } else {
        return { ok: result.ok, error: result.statusText };
      }
    } catch (e) {
      return { error: `useFetchPOST: ${e}` };
    }
  }
};

export default handler;
