/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
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
