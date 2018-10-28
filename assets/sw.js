//import {Store, set, get} from 'idb-keyval';

self.addEventListener('install', function(event) {
	let cachedURLs = [
		'/',
		'index.html',
		'restaurant.html',
		'css/styles.css',
		'js/dbhelper.js',
		'js/main.js',
		'js/restaurant_info.js',
		'img/1.webp',
		'img/2.webp',
		'img/3.webp',
		'img/4.webp',
		'img/5.webp',
		'img/6.webp',
		'img/7.webp',
		'img/8.webp',
		'img/9.webp',
		'img/10.webp',
		'img/undefined.webp',
		'img/icon-192.webp',
		'img/icon-512.webp',
		'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2',
		'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2'
	];

	event.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll(cachedURLs);
		})
		)//.catch(error => {console.log("Error opening sw caches: " + error)}
});

//@TODO add fetch responses only for GET requests
self.addEventListener('fetch', event => {
	event.respondWith(
    caches.match(event.request).then(response => {
/*      	return response ||
      fetch(event.request)*/
      if (response) return response;
      return fetch(event.request)
      .then(resp => {
      	if(!resp || resp.status !== 200 || resp.type !== 'basic') {
      		return resp;
      	}
      	//return DBHelper.fetchRestaurants();
      	return caches.open('v1').then(cache => {
      		cache.put(event.request, resp.clone())
      		return resp;
      		})
      	})
      })
    )//.catch(error => console.log(error));
   });


// if request NOT equals /restaurants/ look in sw caches and return, if not in caches then fetch, else serve from IDB

/*
So in Project 2 you'll ultimately be checking to see if your restaurant data is in the db first. If it is, show that. If it's not, fetch it from the internet, stuff it in the db, and then show it.

1 make a request
2 check if the request is in caches. if it is, return,
3 check if request is in idb, if it is return,
4 if 2 and 3 false, put it in caches and idb then return
*/

/*self.addEventListener('fetch', event => {
	const rURL = new URL(event.request.url);
	const revURL = new URL('http://localhost:1337/reviews')
	 if (event.request.url.includes('restaurants') == true) {
 		event.respondWith(
 			idbRestaurantHandler(event.request),
 			idbReviewsHandler(revURL));
	 }
	 //else if (event.request.url.indexOf('reviews') !== -1)
	 else if (event.request.url.includes('reviews') == true) {
 		event.respondWith(
 			idbReviewsHandler(revURL));
 	}
	else {
		event.waitUntil(
				cachesHandler(event));
	}

});

const idbRestaurantHandler = request => {
	const restaurantsDB = new Store('restaurantsDB', 'restaurants');
	return get('restaurants', restaurantsDB)
		.then(restaurants => {
			if (restaurants) return restaurants;
			return fetch(request)
			.then(response => response.json())
			.then(setRest => {
				set('restaurants', setRest, restaurantsDB);
				setRest.forEach(restaurant => {
					set(restaurant.id, restaurant, restaurantsDB);
				});
				return setRest;
			})
		})
		.then(response => new Response(JSON.stringify(response)));
};

const idbReviewsHandler = request => {
	const reviewsDB = new Store('restaurantsDB', 'restaurants');
		return get('reviews', reviewsDB)
		.then(reviews => {
			if (reviews) return reviews;
			return fetch(request)
			.then(response => response.json())
			.then(setRev => {
				set('reviews', setRev, reviewsDB);
				setRev.forEach(review => {
					set(review.restaurant_id, review, reviewsDB);
				});
				return setRev;
			})
		})
		.then(response => new Response(JSON.stringify(response)));
	}

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
};*/




/*const idbRestaurantHandler = request => {
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
		console.log('test1')
};*/

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

