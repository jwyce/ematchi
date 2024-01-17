import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute, type PrecacheEntry } from 'workbox-precaching';

const precached_list: PrecacheEntry[] = [...build, ...files, ...prerendered].map((file) => ({
	url: file,
	revision: version
}));

precacheAndRoute(precached_list);
