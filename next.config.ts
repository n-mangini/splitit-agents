import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/skills/*/*/raw": ["./skills/**/*"],
  },
  async redirects() {
    return [
      {
        source: "/skills/pm/crear-deck-splitit/raw",
        destination: "/skills/pm/crear-deck-reveal/raw",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
