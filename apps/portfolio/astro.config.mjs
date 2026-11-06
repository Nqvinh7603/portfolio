import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://portfolio.vinhnq.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "vi"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", vi: "vi" } },
      filter: (page) => !page.endsWith("/404/"),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
