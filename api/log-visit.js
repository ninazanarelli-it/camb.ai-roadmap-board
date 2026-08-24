// Serverless function (Vercel). Records a signed-in visitor against today's
// Dubai-time bucket in Redis. api/daily-report.js reads this once a day and
// posts the Slack digest — see AuthGate.jsx for the caller.
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

function dubaiDateKey() {
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(new Date());
  return `roadmap-visits:${date}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, name } = req.body || {};
  if (!email) {
    res.status(400).json({ error: "Missing email" });
    return;
  }

  try {
    const key = dubaiDateKey();
    await redis.hset(key, { [email]: name || email });
    await redis.expire(key, 60 * 60 * 24 * 3);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ error: "Failed to record visit" });
  }
}
