// import { webpack } from 'next/dist/compiled/webpack/webpack.js';
// const webpack = require('webpack');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import pkg from 'next/dist/compiled/webpack/webpack.js';
/** @type {import('next').NextConfig} */
const { webpack } = pkg;
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
	},
	reactStrictMode: true,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				stream: require.resolve('stream-browserify'),
				crypto: require.resolve('crypto-browserify'),
			};

			config.plugins.push(
				new webpack.ProvidePlugin({
					process: 'process/browser',
				}),
				new webpack.NormalModuleReplacementPlugin(
					/node:crypto/,
					(resource) => {
						resource.request = resource.request.replace(
							/^node:/,
							''
						);
					}
				)
			);
		}
		return config;
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
