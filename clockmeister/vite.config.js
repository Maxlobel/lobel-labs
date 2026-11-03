import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const appRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: appRoot,
  base: "/projects/clockmeister/",
  build: {
    outDir: "../dist/projects/clockmeister",
    emptyOutDir: false,
  },
});
