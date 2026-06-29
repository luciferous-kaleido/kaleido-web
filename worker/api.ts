import { Hono } from "hono";

import { routeHealth } from "@worker/routes/health";

import type { AppEnv } from "./types";

export const api = new Hono<AppEnv>();

api.route("/health", routeHealth);
