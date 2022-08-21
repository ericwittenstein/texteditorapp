const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// webpack config files sets up bundling for deployment
module.exports = () => {
	return {
		mode: "development",
		// specifies entry points for files
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
			editor: "./src/js/editor.js",
			header: "./src/js/header.js",
		},

		// where to output the bundle to
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},

		plugins: [
			// Webpack plugin generates html file, injects bundles
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "JATE",
			}),

			// injects css
			new MiniCssExtractPlugin(),

			// injects custom service worker
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),

			// creates the manifest.json file, handles offline behavior instructions
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: "JATE",
				short_name: "JATE",
				description: "Never lose your notes again!",
				background_color: "#225ca3",
				theme_color: "#225ca3",
				start_url: "./",
				publicPath: "./",
				icons: [
					{
						src: path.resolve("src/images/logo.png"),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join("assets", "icons"),
					},
				],
			}),
		],

		module: {
			//css loaders
			rules: [
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules|bower-components/,
					// We use babel-loader in order to use ES6.
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
						},
					},
				},
			],
		},
	};
};
