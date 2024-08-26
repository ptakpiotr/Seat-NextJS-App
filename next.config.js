/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
        return config;
    },
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'openweathermap.org',
                port: '',
                pathname: '/img/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pptakapps.blob.core.windows.net',
                port: '',
                pathname: '/**'
            }
        ]
    }
}

module.exports = nextConfig
