import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
