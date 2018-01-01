// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var dataCacheName = 'findn-v1';
var cacheName = 'findn-final-1';
var filesToCache = [
  '',
  '/',
  '/app/app.js',
  '/app/friends/friends.js',
  '/app/friends/friends.tpl.html',
  '/app/home/home.js',
  '/app/home/home.tpl.html',
  '/app/map/map.js',
  '/app/map/map.tpl.html',
  '/app/meetings/meetings.js',
  '/app/meetings/meetings.tpl.html',
  '/app/places/places.js',
  '/app/places/places.tpl.html',
  '/app/profile/profile.js',
  '/app/profile/profile.tpl.html',
  '/app/users/users.js',
  '/app/users/users.tpl.html',
  '/css/app_styles.css',
  '/assets/friendService/friendService.js',
  '/assets/meetingService/meetingService.js',
  '/assets/googleService/googleService.js',
  '/assets/userService/userService.js',
  '/assets/ajaxResource.js',
  '/assets/settings.js',
  '/dependencies/jquery/dist/jquery.js',
  '/dependencies/angular/angular.js',            
  '/dependencies/moment/moment.js', 
  '/dependencies/angular-materialize/src/angular-materialize.js',
  '/dependencies/materialize/bin/materialize.js',
  '/dependencies/Materialize/bin/materialize.js',
  '/dependencies/socket.io-client/dist/socket.io.js',
  '/dependencies/angular-cookies/angular-cookies.js',
  '/css/materialize.min.css',
  '/dependencies/angular-strap/dist/angular-strap.js',
  '/dependencies/angular-strap/dist/angular-strap.tpl.js',
  '/dependencies/angular-bootstrap/ui-bootstrap-tpls.js',
  '/assets/helpers/socketIo.js',
  '/assets/messageService/messageService.js',
  '/dependencies/localforage/dist/localforage.js', 
  '/dependencies/angular-localForage/dist/angular-localForage.js', 
  '/dependencies/angular-ui-router/release/angular-ui-router.js', 
  '/dependencies/lodash/lodash.js',
  '/app/images/people.jpeg',
  '/app/images/building.jpeg'

  //'/dependencies/angular-sanitize/angular-sanitize.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});