import { Hono } from "hono";

import type { AppEnv } from "@worker/types";

export const routeGetMaster = new Hono<AppEnv>();

routeGetMaster.post("/", async (c) => {
  const url = `https://${c.env.BACKEND_DOMAIN}/statics/count.json`;
  return fetch(url, {
    headers: {
      "CF-Access-Client-Id": c.env.CF_ACCESS_CLIENT_ID,
      "CF-Access-Client-Secret": c.env.CF_ACCESS_CLIENT_SECRET,
    },
  });
});
