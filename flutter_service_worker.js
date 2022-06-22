'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3e9d5b585b72b709d2104a9ed16d273b",
"assets/assets/icons/base.ttf": "f0db12f93925fe320e62c5418e648311",
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
"assets/assets/images/web_hi_res_512.png": "27aa82fd82d9b86b03cd441eaded6720",
"assets/FontManifest.json": "82034ba1f1b943ae10c75c71e79cf6f2",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "fec457c73eb138d29fc782c398ea2990",
"assets/packages/ayjn/assets/images/ic_data_empty.png": "534453bd65e1f8102138d5a82f2d6371",
"assets/packages/ayjn/assets/images/ic_login_bg.png": "aff07cb6b1bbc2b16602729d8bf3174d",
"assets/packages/ayjn/assets/images/ic_network_error.png": "151091c41416824a2420b186c2e91a80",
"assets/packages/ayjn/assets/images/video/video_mini1_placeholder.png": "0fc39be79eb1f6bc598e7924a048cc82",
"assets/packages/ayjn/assets/images/video/video_mini_placeholder.png": "c9916c6e8cf75f2923a74cfa8ef694e5",
"assets/packages/ayjn/assets/images/video/video_placeholder.png": "f1d930088bee6b77c726391fa1668d51",
"assets/packages/ayjn/assets/images/video/video_small_placeholder.png": "e87a281e7e01f7c3f3ba1152e21ce531",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "421893c17cb2490c234243304fcf7f59",
"/": "421893c17cb2490c234243304fcf7f59",
"main.dart.js": "aa25352de77ee9b560f35cef2e8170d9",
"manifest.json": "1ab4f3522f045fda668d45be95d40540",
"version.json": "f50ececd41948be4f01bc2354d895f20"
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
