import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Ugyldig metode" });
  }
  if (req.method === "DELETE") {
    const { pid } = req.query;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/søker/${pid}`, {
      method: "DELETE",
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => res.end());
  }
};

export default handler;
