'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "663bffb53deafbaf036aee5e986bdb3e",
"assets/assets/images/avatar.jpeg": "8f9a14503937952009aed62a8dfa0ec0",
"assets/assets/images/default_avatar.png": "b285b69e8f0aefba914af5e703b3e826",
"assets/assets/images/ic_about.png": "53dee0060e7dfa735d1da0b6c8fbef63",
"assets/assets/images/ic_action_collection.png": "0b5f4a1c462d40dc84ccf1e62d0e5e04",
"assets/assets/images/ic_action_comment.png": "4cf0021eacd33c3f826814ad323a4752",
"assets/assets/images/ic_action_favorites.png": "c0c48034012de348a0619fdd6939a95c",
"assets/assets/images/ic_action_more_arrow.png": "3e370771e27644797f274631a85608a5",
"assets/assets/images/ic_action_offline.png": "dbb5678d3d86aafa77dbb176fd3fe50e",
"assets/assets/images/ic_action_reply.png": "d1d3e2423d53a2c7412e5a0c500bf69d",
"assets/assets/images/ic_action_search_black.png": "8e63b6cda2d7a6b5df3f8d4c45cd9b26",
"assets/assets/images/ic_action_search_small.png": "46799b7eec936396985f732901372fe4",
"assets/assets/images/ic_action_search_white.png": "73a59d5c1f573bd91fa386275242d54c",
"assets/assets/images/ic_action_share.png": "9fe51e495991888a3b1f696d01dd5d8f",
"assets/assets/images/ic_discovery_normal.png": "1de3f31a345f526a0928eabd618450a8",
"assets/assets/images/ic_discovery_selected.png": "914ae0bc8e7227b0a9f8d35edf8e141d",
"assets/assets/images/ic_home_normal.png": "5a722f84265d03152edb12fa6e22ae95",
"assets/assets/images/ic_home_selected.png": "30b88df970761a077b129afc9242c19d",
"assets/assets/images/ic_hot_normal.png": "de558d7a23f2c7dc37035a3bbe2d2c35",
"assets/assets/images/ic_hot_selected.png": "59b4293b2cda911dc62592af3d812045",
"assets/assets/images/ic_mine_normal.png": "a408da4aed43ab6a3ef5e7cb86a15a27",
"assets/assets/images/ic_mine_selected.png": "52db6b81bd4557d2aad39a5c8da66c8d",
"assets/assets/images/state/empty.png": "586f6c5025d588177ceada8960e37500",
"assets/assets/images/state/netError.png": "60df040b4cdc96192a7d353d98cb46e7",
"assets/assets/images/web_hi_res_512.png": "a2f477e49ac284a2b1ced1cd85fdd73f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "d138713b053f488e7dac9ee7bd051f0b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "47fc8425742a282b2535f186d64a82ea",
"/": "47fc8425742a282b2535f186d64a82ea",
"main.dart.js": "a668c372b05c0c77ab05fe061c5d02bb",
"manifest.json": "2138829ce46b43dedac480f5f0bfcf79",
"version.json": "8038b66b37e135653d61a94e5de52470"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
