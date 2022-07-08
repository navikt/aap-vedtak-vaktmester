import { rest } from "msw";
export const handlers = [
  rest.get("/aap-vaktmester/api/topics", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["søkere.api.v1", "søknader.api.v1"]), ctx.delay(600));
  }),
];
