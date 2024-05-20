/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,DELETE,PATCH,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
};

export default nextConfig;

// const webpack = require('webpack');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,

// 	webpack: (config, { isServer }) => {
// 		if (!isServer) {
// 			config.resolve.fallback = {
// 				...config.resolve.fallback,
// 				stream: require.resolve('stream-browserify'),
// 				crypto: require.resolve('crypto-browserify'),
// 			};

// 			config.plugins.push(
// 				new webpack.ProvidePlugin({
// 					process: 'process/browser',
// 				}),
// 				new webpack.NormalModuleReplacementPlugin(
// 					/node:crypto/,
// 					(resource) => {
// 						resource.request = resource.request.replace(
// 							/^node:/,
// 							''
// 						);
// 					}
// 				)
// 			);
// 		}
// 		return config;
// 	},
// };

// module.exports = nextConfig;
