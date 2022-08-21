const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// list of URLs to precache
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
	cacheName: "page-cache",
	plugins: [
		new CacheableResponsePlugin({
			statuses: [0, 200],
		}),
		new ExpirationPlugin({
			maxAgeSeconds: 30 * 24 * 60 * 60,
		}),
	],
});

warmStrategyCache({
	urls: ["/index.html", "/"],
	strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// asset caching
registerRoute(
	({ request }) =>
		["style", "script", "worker"].includes(request.destination),
	new CacheFirst({
		// name of cache storage
		cacheName: "asset-cache",
		plugins: [
			// sets cache age limit at 30 days
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
		],
	})
);
