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
        source: '/zorores/:path*',
        destination: 'https://cc.zorores.com/:path*',
      },
    ]
  },
}
