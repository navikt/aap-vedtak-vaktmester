import { Application, Request } from "express";
import proxy from "express-http-proxy";
import { LogError } from "./logger";
import { IncomingMessage } from "http";

const options = () => ({
  parseReqBody: true,
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.startsWith("/aap-vaktmester/api") ? req.originalUrl.slice(15) : req.originalUrl;
  },
  userResDecorator: function (proxyRes: IncomingMessage, proxyResData: any) {
    if (proxyRes.statusCode > 299) {
      let resData = {};
      try {
        resData = JSON.parse(proxyResData.toString("utf8"));
        // eslint-disable-next-line no-empty -- tatt fra soknad, vurder om det skal gjøres sånn
      } catch {}
      LogError("proxyError", {
        statusCode: proxyRes.statusCode,
        statusMessage: proxyRes?.statusMessage,
        data: resData,
      });
    }
    return proxyResData;
  },
});

export const apiProxy = (apiUrl: string, path: string, server: Application) => {
  server.use(path, proxy(apiUrl, options()));
};
