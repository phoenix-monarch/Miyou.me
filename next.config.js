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
      },
      {
        source: '/api/suzaki/:path*',
        destination: 'https://suzaku.tenshi.moe/:path*',
        // permanent: true,
      },
    ]
  },
  //   async redirects() {
  //   return [
      
  //   ]
  // },

}
