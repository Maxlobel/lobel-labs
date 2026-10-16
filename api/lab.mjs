import { createHash, timingSafeEqual } from "node:crypto";

// Private content belongs in server environment variables, never in the public repository or Vite bundle.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const secret = process.env.LAB_PASSWORD;
  if (!secret || secret.length < 20 || !process.env.LAB_CONTENT_JSON)
    return res
      .status(503)
      .json({
        error: "The private lab is not available yet. Contact Max for access.",
      });
  if (
    !req.headers["content-type"]?.startsWith("application/json") ||
    Number(req.headers["content-length"] || 0) > 2048
  )
    return res.status(400).json({ error: "Invalid request." });
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
  const password = body?.password;
  if (typeof password !== "string" || password.length > 256)
    return res
      .status(401)
      .json({ error: "That password did not unlock the lab." });
  const hash = (value) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(hash(password), hash(secret)))
    return res
      .status(401)
      .json({ error: "That password did not unlock the lab." });
  try {
    const content = JSON.parse(process.env.LAB_CONTENT_JSON);
    if (
      !Array.isArray(content) ||
      content.some(
        (item) =>
          !item ||
          !["title", "description", "status"].every(
            (key) => typeof item[key] === "string",
          ),
      )
    )
      throw new Error("Invalid lab data");
    return res
      .status(200)
      .json({
        experiments: content.map(({ title, description, status }) => ({
          title,
          description,
          status,
        })),
      });
  } catch {
    return res
      .status(503)
      .json({ error: "The private lab is temporarily unavailable." });
  }
}
