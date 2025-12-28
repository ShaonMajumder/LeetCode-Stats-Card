import express from "express";
import { Generator } from "./leetcode/card.js";
import { sanitize } from "./leetcode/sanitize.js";
import { MemoryCache } from "./leetcode/cache.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
};

const app = express();
const cache = new MemoryCache();

app.use((_, res, next) => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

app.options("*", (_, res) => {
  res.status(204).end();
});

async function generateCard(config, header) {
  const sanitized = sanitize(config);
  const generator = new Generator(cache, header);
  const svg = await generator.generate(sanitized);
  return { svg, cacheSeconds: sanitized.cache ?? 60 };
}

app.get("/api/leetcode-card", async (req, res) => {
  try {
    const { svg, cacheSeconds } = await generateCard(req.query, {
      "user-agent": req.get("user-agent") || "Unknown",
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
    return res.status(200).send(svg);
  } catch (error) {
    const status = error?.message === "Missing username" ? 400 : 500;
    return res.status(status).json({ error: error?.message || "Internal server error" });
  }
});

app.get("/:username", async (req, res) => {
  try {
    const config = { ...req.query, username: req.params.username };
    const { svg, cacheSeconds } = await generateCard(config, {
      "user-agent": req.get("user-agent") || "Unknown",
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${cacheSeconds}`);
    return res.status(200).send(svg);
  } catch (error) {
    const status = error?.message === "Missing username" ? 400 : 500;
    return res.status(status).json({ error: error?.message || "Internal server error" });
  }
});

app.get("/", (_, res) => {
  res.json({
    ok: true,
    message: "LeetCode stats card API is running",
    endpoint: "/api/leetcode-card?username=<handle>",
  });
});

export default app;
