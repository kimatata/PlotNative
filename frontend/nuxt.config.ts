import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass", // vuetify
    "@mdi/font/css/materialdesignicons.min.css", // vuetify fonts
    "~/assets/styles/application.scss", // TODO settings.scssに移行
    "bootstrap/dist/css/bootstrap.min.css", // TODO 削除
    "bootstrap-icons/font/bootstrap-icons.css", // TODO 削除
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  // vuetify cssのカスタマイズ
  // hooks: {
  //   "vite:extendConfig": (config) => {
  //     config.plugins.push(
  //       vuetify({
  //         styles: { configFile: resolve("./settings.scss") },
  //       })
  //     );
  //   },
  // },
});
