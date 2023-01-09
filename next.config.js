/** @type {import('next').NextConfig} */


module.exports =  {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  async rewrites() {
    return [
      {
        source: '/api/tenshiUrl/:path*',
        destination: 'https://tenshi.moe/:path*', // The :path parameter isn't used here so will be automatically passed in the query
      },
      {
        source: '/api/suzaki/:path*',
        destination: 'https://suzaku.tenshi.moe/:path*', // The :path parameter isn't used here so will be automatically passed in the query
      },
    ]
  },
}
