import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), image()],
  vite: {
    build: {
      target: ["es2020"],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
      },
    },
  },
});
