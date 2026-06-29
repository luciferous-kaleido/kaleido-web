import { Hono } from "hono";
import { logger } from "hono/logger";

import { api } from "./api";
import type { AppEnv } from "./types";

export const app = new Hono<AppEnv>();

app.use("*", logger());

app.route("/api", api);

app.notFound((c) => {
  return c.json(
    {
      error: "Not found",
      path: c.req.path,
    },
    404,
  );
});

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: "Internal Server Error",
    },
    500,
  );
});
