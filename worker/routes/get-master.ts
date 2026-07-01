import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import type { AppEnv } from "@worker/types";

export const routeGetMaster = new Hono<AppEnv>();

routeGetMaster.post("/", async (c) => {
  const url = `https://${c.env.BACKEND_DOMAIN}/statics/count.json`;
  const resp = await fetch(url, {
    headers: {
      "CF-Access-Client-Id": c.env.CF_ACCESS_CLIENT_ID,
      "CF-Access-Client-Secret": c.env.CF_ACCESS_CLIENT_SECRET,
    },
  });

  if (!resp.ok) {
    throw new HTTPException(502, {
      message: `Backend returned ${resp.status}`,
      cause: {
        upstreamStatus: resp.status,
        upstreamStatusText: resp.statusText,
      },
    });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers,
  });
});
