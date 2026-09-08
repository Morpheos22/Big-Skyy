import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the sandbox preview hostname to fetch /_next/* assets.
  // Without this Next.js 16 logs a cross-origin dev warning on every reload.
  allowedDevOrigins: ["*.space-z.ai", "localhost:3000"],
  // Disable the image optimization API endpoint — we don't use next/image
  // for the brand logo (we use a plain <img> to avoid publishing multiple
  // downloadable resolutions). Allowing the API to exist would expose
  // an unintended way to fetch the source image.
  images: {
    unoptimized: true,
  },
  // Trim the response headers Next.js attaches automatically.
  poweredByHeader: false,
  // Don't expose the Next.js version in HTML comments.
  productionBrowserSourceMaps: false,
};

export default nextConfig;
