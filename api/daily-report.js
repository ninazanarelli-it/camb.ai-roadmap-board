// Vercel Cron job (see vercel.json) — runs once a day and DMs a single
// digest of everyone who opened the Roadmap Board that day (Dubai time).
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
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(500).json({ error: "SLACK_WEBHOOK_URL is not configured" });
    return;
  }

  try {
    const key = dubaiDateKey();
    const visitors = (await redis.hgetall(key)) || {};
    const names = Object.values(visitors);

    const today = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Dubai",
      month: "short",
      day: "numeric",
    }).format(new Date());

    const text = names.length
      ? `\u{1F4CB} *Roadmap Board — visitors on ${today}* (${names.length})\n${names.map((n) => `• ${n}`).join("\n")}`
      : `\u{1F4CB} *Roadmap Board — visitors on ${today}*\nNo one opened the board today.`;

    const slackRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!slackRes.ok) throw new Error(`Slack responded ${slackRes.status}`);

    await redis.del(key);
    res.status(200).json({ ok: true, count: names.length });
  } catch (e) {
    res.status(502).json({ error: "Failed to send daily report" });
  }
}
