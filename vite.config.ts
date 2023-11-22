import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { Miniflare } from 'miniflare';

let env = {};

if(process.env.NODE_ENV === 'development') {
  const mf = new Miniflare({
      kvNamespaces: ['MY_KV'],
      modules: true,
      script: '',
  });
  env = await mf.getBindings();
}

export default defineConfig(() => {
  return {
    plugins: [qwikCity({
      platform: {
        env,
      }
    }), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
