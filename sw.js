importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.googleAnalytics.initialize();

workbox.core.setCacheNameDetails({
    prefix: 'cy',
    suffix: 'v1'
});

// papaparse.min.js
workbox.routing.registerRoute(
    /papaparse\.min\.js/,
    workbox.strategies.cacheFirst({
        cacheName: 'js-plugin-cache-papaparse',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 180, // 180 days
            })
        ]
    })
);

// image
workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            })
        ]
    })
);

// font
workbox.routing.registerRoute(
    /.*\.(?:ttf|woff|woff2)/,
    workbox.strategies.cacheFirst({
        cacheName: 'font-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 180, // 180 days
            })
        ]
    })
);

// google web font
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
                maxEntries: 10
            })
        ]
    })
);

// google spreadsheets csv
workbox.routing.registerRoute(
    /^https:\/\/docs\.google\.com\/spreadsheets\/.+output\=csv.+/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-spreadsheets-csv-files',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                headers: {
                    'X-Is-Cacheable': 'true'
                }
            })
        ]
    })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "a03d6d0196357edca0685779168b5ff3"
  },
  {
    "url": "dist/damage-calculation.min.js",
    "revision": "c1a0f20a51a23303b670ecd8f242e5cf"
  },
  {
    "url": "dist/enchant-simulator.min.js",
    "revision": "0b06dff6b265fe15689f9e5bf8eadfa4"
  },
  {
    "url": "dist/home.min.js",
    "revision": "fc410574e200f756069c3f0a94a6d16b"
  },
  {
    "url": "dist/item-query.min.js",
    "revision": "44f883394666f9edc45a0c2f6cb41bfb"
  },
  {
    "url": "dist/skill-query.min.js",
    "revision": "b2665d1ceb2482bac8d46cdcd48b39bc"
  },
  {
    "url": "src/css/CalculationSystem/Damage/main.css",
    "revision": "d00434f4c070abccca70d8dc6c61f07a"
  },
  {
    "url": "src/css/EnchantSimulator/main.css",
    "revision": "b9d64a60123296337acd852bad648ba2"
  },
  {
    "url": "src/css/ItemQuery/main.css",
    "revision": "d7581cd32f73d090adf0ca696ed1e1ca"
  },
  {
    "url": "src/css/ItemQuery/result.css",
    "revision": "906f18a3af2716b0a3da948285f33ac1"
  },
  {
    "url": "src/css/main/Cyteria/Cyteria.css",
    "revision": "ae9be52a6410afce21966c2795ff8201"
  },
  {
    "url": "src/css/main/font/font.css",
    "revision": "02ea2808c1e702e773dca3bc96064996"
  },
  {
    "url": "src/css/main/global.css",
    "revision": "7ccd50c02c5a6b42f9f46cff1fd88acd"
  },
  {
    "url": "src/css/main/home.css",
    "revision": "74f04ad389850a30b945ed2ab31d05c2"
  },
  {
    "url": "src/css/main/main_media.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "src/css/main/main.css",
    "revision": "01f994ab9727511063d87cca51964e8e"
  },
  {
    "url": "src/css/main/Settings/main.css",
    "revision": "8f8aa5bb7735cbff9b2778e38d2a0c5b"
  },
  {
    "url": "src/css/SaveLoad/main.css",
    "revision": "593364263594864ca17ff9a02cdacfb3"
  },
  {
    "url": "src/css/SkillQuery/DrawSkillTree.css",
    "revision": "edef0e4b0f655a4c19a83e35330339ff"
  },
  {
    "url": "src/css/SkillQuery/SkillBranch/animation.css",
    "revision": "648f542093e8d6e455d16c375bdde5cd"
  },
  {
    "url": "src/css/SkillQuery/SkillBranch/SkillBranch.css",
    "revision": "3b19fb2f34e04016dbaee6683858742f"
  },
  {
    "url": "src/css/SkillQuery/SkillQuery.css",
    "revision": "2ff76a5cad369fcd35a0b2581147dcf7"
  },
  {
    "url": "src/css/SkillSimulator/main.css",
    "revision": "ecb054febaa998466e9df814f60c8aef"
  },
  {
    "url": "src/css/TagSystem/main.css",
    "revision": "39d13da833bbe96afe9047b8ad869edb"
  }
]);