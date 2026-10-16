import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/lab.mjs";

async function request(method, body, env = true) {
  if (env) {
    process.env.LAB_PASSWORD = "test-only-secret-with-over-20-characters";
    process.env.LAB_CONTENT_JSON = JSON.stringify([
      {
        title: "Private sentinel",
        description: "Never public",
        status: "Researching",
        internal: "Must not be returned",
      },
    ]);
  } else {
    delete process.env.LAB_PASSWORD;
    delete process.env.LAB_CONTENT_JSON;
  }
  const result = { headers: {}, code: 200, body: null };
  const res = {
    setHeader(k, v) {
      result.headers[k] = v;
    },
    status(code) {
      result.code = code;
      return this;
    },
    json(body) {
      result.body = body;
      return this;
    },
  };
  await handler(
    { method, body, headers: { "content-type": "application/json" } },
    res,
  );
  return result;
}

test("lab never discloses data through GET, bad passwords, malformed input, or missing configuration", async () => {
  for (const [method, body, env, code] of [
    ["GET", {}, true, 405],
    ["POST", { password: "wrong" }, true, 401],
    ["POST", "{", true, 400],
    ["POST", { password: "anything" }, false, 503],
  ]) {
    const response = await request(method, body, env);
    assert.equal(response.code, code);
    assert.doesNotMatch(
      JSON.stringify(response.body),
      /Private sentinel|Never public/,
    );
    assert.match(response.headers["Cache-Control"], /no-store/);
  }
});
test("a valid password returns only the allowed display fields and never caches them", async () => {
  const response = await request("POST", {
    password: "test-only-secret-with-over-20-characters",
  });
  assert.equal(response.code, 200);
  assert.deepEqual(response.body, {
    experiments: [
      {
        title: "Private sentinel",
        description: "Never public",
        status: "Researching",
      },
    ],
  });
  assert.match(response.headers["Cache-Control"], /no-store/);
  assert.match(response.headers["X-Robots-Tag"], /noindex/);
});
