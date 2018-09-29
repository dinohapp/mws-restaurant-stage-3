import {set, get} from 'idb-keyval';

self.addEventListener('install', function(event) {
	let cachedURLs = [
		'/',
		'index.html',
		'restaurant.html',
		'css/styles.css',
		'js/dbhelper.js',
		'js/main.js',
		'js/restaurant_info.js',
		'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg',
		'img/undefined.jpg',
		'img/icon-192.png',
		'img/icon-512.png'
		// 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2',
		// 'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2'
	];

	event.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll(cachedURLs);
		})
	);
});


// if request NOT equals /restaurants/ look in sw caches and return, if not in caches then fetch, else serve from IDB

/*
So in Project 2 you'll ultimately be checking to see if your restaurant data is in the db first. If it is, show that. If it's not, fetch it from the internet, stuff it in the db, and then show it.

1 make a request
2 check if the request is in caches. if it is, return,
3 check if request is in idb, if it is return,
4 if 2 and 3 false, put it in caches and idb then return
*/

self.addEventListener('fetch', event => {
	const rURL = new URL(event.request.url);
	// if (event.request.url.indexOf('https://maps.googleapis.com/maps') == 0) {
	// 	event.respondWith(
	// 		mapsHandler(event.request));
	// }
	if(rURL.port === '1337') {
		event.respondWith(
			idbHandler(event.request));
	}
	else {
		event.waitUntil(
				cachesHandler(event));
	}

});

// const mapsHandler = event => {
// 	return fetch(event.request);
// };

const idbHandler = request => {
	return get('restaurants')
		.then(restaurants => {
			if (restaurants) return restaurants;
			return fetch(request)
			.then(response => response.json())
			.then(setRest => {
				set('restaurants', setRest);
				setRest.forEach(restaurant => {
					set(restaurant.id, restaurant);
				});
				return setRest;
			})
		})
		.then(response => new Response(JSON.stringify(response)));
};

const cachesHandler = event => {
	event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request)
      .then(resp => {
      	if(!resp || resp.status !== 200 || resp.type !== 'basic') {
      		return resp;
      	}
      	return caches.open('v1').then(cache => {
      		cache.put(event.request, resp.clone())
      		return resp;
      		})
      	})
      })
    );
};

/*
//original
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
      })
  );
 */

