module.exports = {
  distDir: "deploy",
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "ekyc_portal_id";
  },
  generateEtags: false,
  // trailingSlash: true,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  poweredByHeader: false,
  httpAgentOptions: {
    keepAlive: false,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecretKey: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    basePath: "/cms",
  },
  experimental: {
    basePath: "/cms",
  },
  basePath: "/cms",
  assetPrefix: "/cms",
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  compress: false, //  gzip compression to compress rendered content and static files
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config;
  },
  // async headers() {
  //Custom value header
  // return [
  // {
  // source: "/about",
  // headers: [
  //   {
  //     key: "x-custom-header",
  //     value: "my custom header value",
  //   },
  //   {
  //     key: "x-another-custom-header",
  //     value: "my other custom header value",
  //   },
  // ],
  //   },
  // ];
  // },
  // async redirects() {
  //   return [
  // {
  //   source: "/old-blog/:slug",
  //   destination: "/news/:slug", // Matched parameters can be used in the destination
  //   permanent: true,
  // },
  // ];
  // },
};
