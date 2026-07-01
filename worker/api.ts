import { Hono } from "hono";

import { routeCreatePutUrl } from "@worker/routes/create-put-url";
import { routeGetMaster } from "@worker/routes/get-master";
import { routeHealth } from "@worker/routes/health";

import type { AppEnv } from "./types";

export const api = new Hono<AppEnv>();

api.route("/health", routeHealth);
api.route("/get-master", routeGetMaster);
api.route("/create-put-url", routeCreatePutUrl);
