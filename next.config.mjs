/** @type {import('next').NextConfig} */

import path from "path";

const __dirname = path.resolve();

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@"] = path.resolve(__dirname);
    }

    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "components"
    );
    config.resolve.alias["@/api"] = path.resolve(__dirname, "api");
    config.resolve.alias["@/context"] = path.resolve(__dirname, "context");
    config.resolve.alias["@/helpers"] = path.resolve(__dirname, "helpers");

    return config;
  },
};

export default nextConfig;
