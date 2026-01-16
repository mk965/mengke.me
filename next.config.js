const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is cloud.umami.is va.vercel-scripts.com *.i.posthog.com static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app *.github.io *.google.com codepen.io
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.gr-assets.com', // Goodreads book covers
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co', // Spotify album covers
        },
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com', // IMDB movie posters
        },
        {
          protocol: 'https',
          hostname: 'mengke.zeabur.app', // usemoment resources
        },
      ],
      unoptimized,
    },
    async rewrites() {
      return [
        // Proxy Umami script/events to avoid blockers while keeping a stable local path.
        // /stats/script.js  -> https://analytics.umami.is/script.js
        // /stats/api/send   -> https://analytics.umami.is/api/send
        {
          source: '/stats/:path*',
          destination: 'https://analytics.umami.is/:path*',
        },
      ]
    },
    async headers() {
      return [
        // Global security headers
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
        // Cache static images for 1 year
        {
          source: '/static/images/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        // Cache favicons for 1 year
        {
          source: '/static/favicons/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        // Cache other static assets for 30 days
        {
          source: '/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=2592000',
            },
          ],
        },
      ]
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'prefixIds',
                    params: {
                      delim: '__',
                      prefixIds: true,
                      prefixClassNames: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      })

      return config
    },
  })
}
