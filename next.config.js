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
        destination: 'https://tenshi.moe/:path*',
      }
    ]
  },
    async redirects() {
    return [
      {
        source: '/api/suzaki/:path*',
        destination: 'https://seiryuu.tenshi.moe/:path*',
        permanent: true,
      },
    ]
  },

}
