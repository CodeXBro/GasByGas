import type { NextConfig } from "next";
const withTM = require("next-transpile-modules")(["class-transformer"]);

const nextConfig: NextConfig = withTM({
  compiler: {
    styledComponents: true,
  },
  devIndicators: {
    appIsrStatus: false
  },
  reactStrictMode: true,
});

export default nextConfig;
