import { type Config } from "prettier";

const config: Config = {
  trailingComma: "none",
  singleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css"
};

export default config;
