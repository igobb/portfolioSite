import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const supabaseUrl = process.env.SUPABASE_URL

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseUrl
      ? [new URL('/storage/v1/object/public/screenshots/**', supabaseUrl)]
      : [],
  },
}

export default withNextIntl(nextConfig)
