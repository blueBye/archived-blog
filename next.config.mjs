/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
