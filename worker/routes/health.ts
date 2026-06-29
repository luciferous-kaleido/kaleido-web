import { Hono } from "hono";

import type { AppEnv } from "@worker/types";

export const routeHealth = new Hono<AppEnv>();

routeHealth.get("/", (c) => {
  return c.json({ ok: true });
});
