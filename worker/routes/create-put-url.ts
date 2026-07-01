import { AwsClient } from "aws4fetch";
import { Hono } from "hono";
import { extension as resolveExtension } from "mime-types";
import { uuidv7 } from "uuidv7";

import type { AppEnv } from "@worker/types";

const EXPIRES_SECONDS = 900;

export const routeCreatePutUrl = new Hono<AppEnv>();

type RequestBody = {
  mimeType: string;
};

type ResponseBody = {
  url: string;
  key: string;
};

routeCreatePutUrl.post("/", async (c) => {
  const body = await c.req.json<RequestBody>();

  const client = new AwsClient({
    service: "s3",
    region: "auto",
    accessKeyId: c.env.R2_ACCESS_KEY_ID,
    secretAccessKey: c.env.R2_SECRET_ACCESS_KEY,
  });

  const ext = resolveExtension(body.mimeType) as string;
  const key = `images/${uuidv7()}.${ext}`;
  const url = `${c.env.R2_ENDPOINT}/${key}?X-Amz-Expires=${EXPIRES_SECONDS}`;

  const req = new Request(url, {
    method: "PUT",
    headers: {
      "Content-Type": body.mimeType,
    },
  });

  const preSignedUrl = await client.sign(req, {
    aws: { signQuery: true },
  });

  return c.json<ResponseBody>({
    url: preSignedUrl.url,
    key,
  });
});
