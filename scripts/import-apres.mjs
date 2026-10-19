import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { resolve, join } from "node:path";
import { execFileSync } from "node:child_process";

// Build browser assets from an authorized checkout without publishing private source or server files.
const checkout = process.argv[2];
if (!checkout)
  throw new Error("Usage: node scripts/import-apres.mjs /path/to/apres_boston");
const stage = resolve(".apres-build.local");
if (existsSync(stage))
  throw new Error(
    "Remove the previous .apres-build.local staging directory before rebuilding.",
  );
mkdirSync(stage);
for (const name of [
  "src",
  "public",
  "package.json",
  "package-lock.json",
  "vite.config.ts",
  "tailwind.config.ts",
  "postcss.config.js",
  "tsconfig.json",
  "tsconfig.app.json",
  "tsconfig.node.json",
  "index.html",
])
  cpSync(join(checkout, name), join(stage, name), { recursive: true });
// .env.local must contain only this app's browser-safe Supabase URL and publishable key.
const envPath = join(checkout, ".env.local");
const safeEnv = existsSync(envPath)
  ? readFileSync(envPath, "utf8")
      .split("\n")
      .filter((line) => /^VITE_SUPABASE_(URL|PUBLISHABLE_KEY)=/.test(line))
      .join("\n")
  : "";
if (
  !safeEnv.includes("VITE_SUPABASE_URL=") ||
  !safeEnv.includes("VITE_SUPABASE_PUBLISHABLE_KEY=")
)
  throw new Error(
    "Set the Après Supabase URL and publishable key in the source checkout .env.local.",
  );
writeFileSync(join(stage, ".env.local"), safeEnv);
const edit = (name, transform) => {
  const p = join(stage, name);
  writeFileSync(p, transform(readFileSync(p, "utf8")));
};
const base = "/projects/apres-boston/";
edit("vite.config.ts", (s) =>
  s.replace("server: {", `base: '${base}',\n  server: {`),
);
edit("src/App.tsx", (s) =>
  s
    .replace(
      "<BrowserRouter>",
      "<BrowserRouter basename={import.meta.env.BASE_URL}>",
    )
    .replace(
      "window.history.replaceState({}, '', '/');",
      "window.history.replaceState({}, '', import.meta.env.BASE_URL);",
    ),
);
for (const name of ["src/contexts/AuthContext.tsx", "src/pages/Auth.tsx"])
  edit(name, (s) =>
    s
      .replace(
        /window\.location\.hostname === 'www\.apresboston\.app' \|\|\s*window\.location\.hostname === 'apresboston\.app'/g,
        "!import.meta.env.DEV",
      )
      .replace(
        "return devModeFlag;",
        "return import.meta.env.DEV && devModeFlag;",
      )
      .replace(
        "const isDevPhone = method === 'phone'",
        "const isDevPhone = import.meta.env.DEV && method === 'phone'",
      )
      .replace(
        "const isDevEmail = method === 'email'",
        "const isDevEmail = import.meta.env.DEV && method === 'email'",
      )
      .replace(
        "if (isTestEmail(cleanEmail))",
        "if (import.meta.env.DEV && isTestEmail(cleanEmail))",
      ),
  );
for (const name of ["src/pages/Home.tsx", "src/pages/Onboarding.tsx"])
  edit(name, (s) =>
    s.replaceAll(
      "localStorage.getItem('dev_mode') === 'true'",
      "import.meta.env.DEV && localStorage.getItem('dev_mode') === 'true'",
    ),
  );

edit("src/pages/Auth.tsx", (s) =>
  s.replace(
    /<button\s+type="button"\s+onClick=\{useTestCredentials\}[\s\S]*?<\/button>/,
    "{import.meta.env.DEV && ($&)}",
  ),
);

edit("src/pages/NotFound.tsx", (s) =>
  s.replace('href="/"', "href={import.meta.env.BASE_URL}"),
);
edit("src/pages/Index.tsx", (s) =>
  s.replace(
    "{/* Hero icon */}",
    '<a href="/#projects" className="mb-8 inline-block text-sm text-muted-foreground underline">Back to Max Lobel</a>\n          {/* Hero icon */}',
  ),
);
edit("index.html", (s) =>
  s
    .replace(
      'href="/manifest.webmanifest"',
      'href="%BASE_URL%manifest.webmanifest"',
    )
    .replace(
      "<title>Après Boston</title>",
      '<title>Après Boston | Max Lobel</title>\n    <link rel="canonical" href="https://maxlobel.com/projects/apres-boston/" />',
    ),
);
edit("public/manifest.webmanifest", (s) => {
  const manifest = JSON.parse(s);
  manifest.start_url = base;
  manifest.scope = base;
  manifest.icons = [
    { src: base + "favicon.svg", sizes: "any", type: "image/svg+xml" },
  ];
  return JSON.stringify(manifest, null, 2);
});
writeFileSync(
  join(stage, "public/favicon.svg"),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#132d42"/><path d="M8 48 26 16l13 22 7-12 12 22Z" fill="none" stroke="#7dd3fc" stroke-width="4" stroke-linejoin="round"/></svg>',
);
execFileSync("npm", ["ci", "--no-audit", "--no-fund"], {
  cwd: stage,
  stdio: "inherit",
});
execFileSync("npm", ["run", "build"], { cwd: stage, stdio: "inherit" });
const output = resolve("public/projects/apres-boston");
// Output contains only a static browser build, never source, migrations, environment files, or source maps.
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(join(stage, "dist"), output, { recursive: true });
console.log(
  "Après Boston browser build copied to public/projects/apres-boston.",
);
