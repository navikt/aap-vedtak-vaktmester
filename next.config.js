const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://aap-devtools.dev.intern.nav.no/" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
