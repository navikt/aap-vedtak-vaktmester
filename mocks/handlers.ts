import { rest } from "msw";
import { TopicResponse } from "../src/types/TopicResponse";

const soekereResponse: TopicResponse[] = [
  {
    topic: "soekere.api.v1",
    key: "1234567",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDRUMTE6MjQ6MjEuMDIzNzQyNjc4IiwiZXJNZWRsZW0iOiJ0cnVlIn0",
    partition: 1,
    offset: 1,
    timestamp: 1656925433089,
  },
  {
    topic: "soekere.api.v1",
    key: "9187342",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDFUMTQ6MDc6NTMuNDU1NDMwNSIsImVyTWVkbGVtIjoidHJ1ZSJ9",
    partition: 1,
    offset: 0,
    timestamp: 1656932151375,
  },
];

const soeknaderResponse: TopicResponse[] = [
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-1",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDRUMTE6MjQ6MjEuMDIzNzQyNjc4IiwiZXJNZWRsZW0iOiJ0cnVlIn0=",
    partition: 8,
    offset: 0,
    timestamp: 1656926661131,
  },
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-2",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDFUMTQ6MDc6NTMuNDU1NDMwNSIsImVyTWVkbGVtIjoidHJ1ZSJ9",
    partition: 11,
    offset: 0,
    timestamp: 1656677273663,
  },
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-3",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDFUMTQ6MTE6MDUuMjY1MTM3MTUiLCJlck1lZGxlbSI6InRydWUifQ==",
    partition: 11,
    offset: 1,
    timestamp: 1656677465265,
  },
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-4",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDFUMTQ6NDM6MTAuMTAzNTY5NDY2IiwiZXJNZWRsZW0iOiJ0cnVlIn0=",
    partition: 11,
    offset: 2,
    timestamp: 1656679390106,
  },
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-5",
    value:
      "eyJ2dXJkZXJ0QXYiOiJGX1o5OTQ1NTQuRV9aOTk0NTU0QHRyeWdkZWV0YXRlbi5ubyIsInRpZHNwdW5rdEZvclZ1cmRlcmluZyI6IjIwMjItMDctMDRUMTE6MDM6MTcuNTYxMTE0MTAxIiwiZXJNZWRsZW0iOiJmYWxzZSJ9",
    partition: 11,
    offset: 3,
    timestamp: 1656925397566,
  },
  {
    topic: "soeknader.api.v1",
    key: "soknadkey-6",
    value: null,
    partition: 11,
    offset: 4,
    timestamp: 1656925433089,
  },
];

export const handlers = [
  rest.get("/api/topics", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["soekere.api.v1", "soeknader.api.v1"]), ctx.delay(650));
  }),
  rest.get("/api/topic/soekere.api.v1/latest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(soekereResponse), ctx.delay(250));
  }),
  rest.get("/api/topic/soekere.api.v1/earliest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(soekereResponse.reverse()), ctx.delay(250));
  }),
  rest.get("/api/topic/soeknader.api.v1/latest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(soeknaderResponse), ctx.delay(1200));
  }),
  rest.get("/api/topic/soeknader.api.v1/earliest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(soeknaderResponse.reverse()), ctx.delay(250));
  }),
  rest.delete("/api/soeker/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(850));
  }),
  rest.delete("/api/soeknad/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1202));
  }),
];
