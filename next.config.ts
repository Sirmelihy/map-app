/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swdmctrvenohtljitwpl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**', // Supabase public storage yoluna izin verir
      },
    ],
  },
};

module.exports = nextConfig;