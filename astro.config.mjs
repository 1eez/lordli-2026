import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lordli.com",
  output: "static",
  build: { inlineStylesheets: "always" },
});
