/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/dbhelper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/dbhelper.js":
/*!*******************************!*\
  !*** ./assets/js/dbhelper.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb-keyval */ \"./node_modules/idb-keyval/dist/idb-keyval.mjs\");\n\r\n\r\n/**\r\n * Common database helper functions.\r\n */\r\n\r\n\r\n\r\nconst restaurantsDB = new idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"Store\"]('restaurantsDB', 'restaurants');\r\nconst reviewsDB = new idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"Store\"]('reviewsDB', 'reviews');\r\n\r\nclass DBHelper {\r\n\r\n  /**\r\n   * Database URL.\r\n   * Change this to restaurants.json file location on your server.\r\n   */\r\n\r\n//LINKS\r\n/*\r\nfav\r\nhttp://localhost:1337/restaurants/?is_favorite=true\r\n\r\nreviews for certain restaurant\r\nhttp://localhost:1337/reviews/?restaurant_id=<restaurant_id>\r\n\r\nget all reviews\r\nhttp://localhost:1337/reviews/\r\n\r\n\r\nobject format\r\n{\r\n    \"restaurant_id\": <restaurant_id>,\r\n    \"name\": <reviewer_name>,\r\n    \"rating\": <rating>,\r\n    \"comments\": <comment_text>\r\n}\r\n*/\r\n\r\n   //***TODO FETCH REVIEWS FROM SERVER***//\r\n  static get DATABASE_URL() {\r\n    const port = 1337 // Change this to your server port\r\n    return `http://localhost:${port}/restaurants`;\r\n  }\r\n\r\n  static get DATABASE_REVIEWS_URL() {\r\n    const port = 1337 // Change this to your server port\r\n    return `http://localhost:${port}/reviews`;\r\n  }\r\n\r\n  /**\r\n   * Fetch all restaurants.\r\n   */\r\n  static fetchRestaurants(callback, id) {\r\n    return(Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])('restaurants', restaurantsDB))\r\n    .then(function(restaurants){\r\n       if (restaurants) {\r\n          return (restaurants, callback(null, restaurants))\r\n       }\r\n       return fetch(DBHelper.DATABASE_URL)\r\n      .then(response => response.json())\r\n          .then(restaurants => {\r\n            restaurants.forEach(restaurant => {\r\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(restaurant.id, restaurant, restaurantsDB);\r\n          return (callback(null, restaurants), restaurants);\r\n        })\r\n      })\r\n    })\r\n  }\r\n\r\n\r\n/*  static fetchRestaurants(callback, id) {\r\n    return(get('restaurants', restaurantsDB))\r\n    .then(function(restaurants){\r\n       if (restaurants) {\r\n          return (restaurants, callback(null, restaurants))\r\n       }\r\n       return fetch(DBHelper.DATABASE_URL)\r\n      .then(response => response.json())\r\n          .then(function setRest(rest) {\r\n            set('restaurants', rest, restaurantsDB);\r\n          return (callback(null, rest), rest);\r\n        })\r\n      });\r\n    }*/\r\n\r\n/* static idbRestaurantHandler() {\r\n  const restaurantsDB = new Store('restaurantsDB', 'restaurants');\r\n  return fetch(DBHelper.DATABASE_URL)\r\n  .then(response => response.json())\r\n      .then(function setRest(rest) {\r\n        set('restaurants', rest, restaurantsDB);\r\n          rest.forEach(restaurant => {\r\n            set(restaurant.id, restaurant, restaurantsDB);\r\n            return rest;\r\n        });\r\n      })\r\n};*/\r\n\r\n\r\n  static fetchReviews(callback, rest_id) {\r\n    return(Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])('reviews', reviewsDB))\r\n    .then(function(reviews){\r\n       if (reviews) {\r\n          return reviews;\r\n       }\r\n       return fetch(DBHelper.DATABASE_REVIEWS_URL)\r\n      .then(response => response.json())\r\n          .then(reviews => {\r\n            console.log(reviews);\r\n            reviews.forEach(review => {\r\n              console.log(review);\r\n            Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(review.id, review, reviewsDB);\r\n          return (callback(null, reviews), reviews);\r\n        })\r\n      })\r\n     })\r\n    }\r\n\r\n/*\r\n  static fetchReviews(callback, id) {\r\n    return DBHelper.getReviewsFromDB()\r\n    .then(function(reviews){\r\n       if (reviews) {\r\n          return reviews, callback(null, reviews)\r\n       }\r\n       return DBHelper.idbReviewsHandler();\r\n      });\r\n    }\r\n\r\n\r\n static idbReviewsHandler(id) {\r\n  const reviewsDB = new Store('restaurantsDB', 'restaurants');\r\n  return fetch(DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + 1)\r\n  .then(response => response.json())\r\n      .then(function setRev(rev) {\r\n        set('reviews', rev, reviewsDB);\r\n          rev.forEach(review => {\r\n            set(review.restaurant_id, review, reviewsDB);\r\n            return rev;\r\n        });\r\n      })\r\n};\r\n*/\r\n\r\n/*static fetchReviews(callback, id) {\r\n    //let fURL = DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id;\r\n    let fURL = 'http://localhost:1337/reviews' + '/?restaurant_id='+ 1;\r\n    fetch(fURL, {method: 'GET'})\r\n    .then(function(response){\r\n      //let resp = JSON.parse(response);\r\n      //let restaurants = resp.json();\r\n      response.json()\r\n    .then(function(reviews){\r\n      callback(null, reviews);\r\n      });\r\n    })\r\n    .catch(function(error) {\r\n      callback(`Error, ${error.statusText}`, null)\r\n    })\r\n  };*/\r\n\r\n/*static idbReviewsHandler = request => {\r\n  const reviewsDB = new Store('restaurantsDB', 'restaurants');\r\n    return get('reviews', reviewsDB)\r\n    .then(reviews => {\r\n      if (reviews) return reviews;\r\n      return fetch(request)\r\n      .then(response => response.json())\r\n      .then(setRev => {\r\n        set('reviews', setRev, reviewsDB);\r\n        setRev.forEach(review => {\r\n          set(review.restaurant_id, review, reviewsDB);\r\n        });\r\n        return setRev;\r\n      })\r\n    })\r\n    .then(response => new Response(JSON.stringify(response)));\r\n  }*/\r\n\r\n\r\n\r\n/*fetch(\"http://localhost:1337/reviews/?restaurant_id=1\", {method: 'GET'})\r\n.then(function(response){console.log(response.json())})*/\r\n\r\n\r\n\r\n/*static fetchReviews(callback, id) {\r\n  fetch(DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id, {method: 'GET'})\r\n    .then(function(response){\r\n      response.json;\r\n      console.log(response.json())\r\n    })\r\n    .then(function(reviews){\r\n      console.log(response.json())\r\n      callback(null, reviews)\r\n    })\r\n    .catch(function(error) {\r\n      callback(`Error, ${error.statusText}`, null)\r\n    })\r\n  }*/\r\n  /*static fetchReviews(callback, id) {\r\n    //let fURL = DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id;\r\n    let fURL = 'http://localhost:1337/reviews' + id.restaurant_id;\r\n    fetch(fURL, {method: 'GET'})\r\n    .then(function(response){\r\n      //let resp = JSON.parse(response);\r\n      //let restaurants = resp.json();\r\n      response.json()\r\n    .then(function(reviews){\r\n      callback(null, reviews);\r\n      });\r\n    })\r\n    .catch(function(error) {\r\n      callback(`Error, ${error.statusText}`, null)\r\n    })\r\n  };*/\r\n\r\n  /**\r\n   * Toggle Favorite status.\r\n   */\r\n  static toggleFavorite(id, favToggle) {\r\n    fetch(`http://localhost:1337/restaurants/${id}/?is_favorite=${favToggle}`, {\r\n      method: 'PUT'\r\n    })\r\n    .then(() => {\r\n      Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"get\"])(id, restaurantsDB)\r\n      .then(restaurant => {\r\n        restaurant.is_favorite = favToggle;\r\n        Object(idb_keyval__WEBPACK_IMPORTED_MODULE_0__[\"set\"])(id, restaurant, restaurantsDB);\r\n      })\r\n    })\r\n   }\r\n\r\n  /**\r\n   * Fetch a restaurant by its ID.\r\n   */\r\n  static fetchRestaurantById(id, callback) {\r\n    // fetch all restaurants with proper error handling.\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n          const restaurant = restaurants.find(r => r.id == id);\r\n//        const restaurant = restaurants.find(r => r.id == id);\r\n        if (restaurant) { // Got the restaurant\r\n          callback(null, restaurant);\r\n        } else { // Restaurant does not exist in the database\r\n          callback('Restaurant does not exist', null);\r\n        }\r\n      }\r\n      })//    }, id);\r\n  }\r\n\r\n  static fetchReviewsById(id, callback) {\r\n    // fetch all restaurants with proper error handling.\r\n    DBHelper.fetchReviews((error, reviews) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n          const review = reviews.find(r => r.id == id.restaurant_id);\r\n/*          const review2 = reviews.find(r => r.restaurant_id == id);\r\n          const review3 = reviews.find(r => r.id == id);\r\n          console.log(review);\r\n          console.log(review2);\r\n          console.log(review3);*/\r\n//        const restaurant = restaurants.find(r => r.id == id);\r\n        if (review) { // Got the restaurant\r\n          callback(null, review);\r\n          console.log(review);\r\n        } else { // Restaurant does not exist in the database\r\n          callback('Review does not exist', null);\r\n          console.log('no reviews')\r\n        }\r\n      }\r\n      });\r\n  }\r\n\r\n  /**\r\n   * Fetch restaurants by a cuisine type with proper error handling.\r\n   */\r\n  static fetchRestaurantByCuisine(cuisine, callback) {\r\n    // Fetch all restaurants  with proper error handling\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n        // Filter restaurants to have only given cuisine type\r\n        const results = restaurants.filter(r => r.cuisine_type == cuisine);\r\n        callback(null, results);\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Fetch restaurants by a neighborhood with proper error handling.\r\n   */\r\n  static fetchRestaurantByNeighborhood(neighborhood, callback) {\r\n    // Fetch all restaurants\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n        // Filter restaurants to have only given neighborhood\r\n        const results = restaurants.filter(r => r.neighborhood == neighborhood);\r\n        callback(null, results);\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n   */\r\n  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\r\n    // Fetch all restaurants\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n        let results = restaurants\r\n        if (cuisine != 'all') { // filter by cuisine\r\n          results = results.filter(r => r.cuisine_type == cuisine);\r\n        }\r\n        if (neighborhood != 'all') { // filter by neighborhood\r\n          results = results.filter(r => r.neighborhood == neighborhood);\r\n        }\r\n        callback(null, results);\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Fetch all neighborhoods with proper error handling.\r\n   */\r\n  static fetchNeighborhoods(callback) {\r\n    // Fetch all restaurants\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n        // Get all neighborhoods from all restaurants\r\n        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)\r\n        // Remove duplicates from neighborhoods\r\n        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)\r\n        callback(null, uniqueNeighborhoods);\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Fetch all cuisines with proper error handling.\r\n   */\r\n  static fetchCuisines(callback) {\r\n    // Fetch all restaurants\r\n    DBHelper.fetchRestaurants((error, restaurants) => {\r\n      if (error) {\r\n        callback(error, null);\r\n      } else {\r\n        // Get all cuisines from all restaurants\r\n        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)\r\n        // Remove duplicates from cuisines\r\n        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)\r\n        callback(null, uniqueCuisines);\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Restaurant page URL.\r\n   */\r\n  static urlForRestaurant(restaurant) {\r\n    return (`./restaurant.html?id=${restaurant.id}`);\r\n  }\r\n\r\n  /**\r\n   * Restaurant image URL.\r\n   */\r\n  static imageUrlForRestaurant(restaurant) {\r\n    return (`/img/${restaurant.photograph}.jpg`);\r\n  }\r\n\r\n  /**\r\n   * Restaurant image alt text.\r\n   */\r\n  static imageAltForRestaurant(restaurant) {\r\n    return (`${restaurant.photograph_description}`);\r\n  }\r\n\r\n  /**\r\n   * Map marker for a restaurant.\r\n   */\r\n  static mapMarkerForRestaurant(restaurant, map) {\r\n    const marker = new google.maps.Marker({\r\n      position: restaurant.latlng,\r\n      title: restaurant.name,\r\n      url: DBHelper.urlForRestaurant(restaurant),\r\n      map: map,\r\n      animation: google.maps.Animation.DROP}\r\n    );\r\n    return marker;\r\n  }\r\n}\r\nwindow.DBHelper = DBHelper;\r\n/*\r\nself.addEventListener('fetch', event => {\r\n  event.respondWith(\r\n    matchCaches(event.request),\r\n    idbRestaurantHandler(event.request)\r\n\r\n    );\r\n   });\r\n\r\nconst matchCaches = event => {\r\ncaches.match(event.request).then(function(response) {\r\n      if (response) return response;\r\n      return fetch(event.request)\r\n      .then(resp => {\r\n        if(!resp || resp.status !== 200 || resp.type !== 'basic') {\r\n          return resp;\r\n        }\r\n        return caches.open('v1').then(cache => {\r\n          cache.put(event.request, resp.clone())\r\n          return resp;\r\n          })\r\n        })\r\n      })\r\n};\r\n\r\nconst idbRestaurantHandler = request => {\r\n\r\n  fetch(event.request).catch(result => {\r\n    return get('restaurants', restaurantsDB)\r\n    .then(restaurants => {\r\n      if (restaurants) return restaurants;\r\n      return fetch(request)\r\n      .then(response => response.json())\r\n      .then(setRest => {\r\n        set(setRest, restaurantsDB);\r\n        setRest.forEach(restaurant => {\r\n          set(restaurant.id, restaurant, restaurantsDB);\r\n          });\r\n        return setRest;\r\n        })\r\n      })\r\n    .then(response => new Response(JSON.stringify(response)));\r\n  }\r\n)};*/\n\n//# sourceURL=webpack:///./assets/js/dbhelper.js?");

/***/ }),

/***/ "./node_modules/idb-keyval/dist/idb-keyval.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/idb-keyval/dist/idb-keyval.mjs ***!
  \*****************************************************/
/*! exports provided: Store, get, set, del, clear, keys */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return Store; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set\", function() { return set; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"del\", function() { return del; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clear\", function() { return clear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keys\", function() { return keys; });\nclass Store {\r\n    constructor(dbName = 'keyval-store', storeName = 'keyval') {\r\n        this.storeName = storeName;\r\n        this._dbp = new Promise((resolve, reject) => {\r\n            const openreq = indexedDB.open(dbName, 1);\r\n            openreq.onerror = () => reject(openreq.error);\r\n            openreq.onsuccess = () => resolve(openreq.result);\r\n            // First time setup: create an empty object store\r\n            openreq.onupgradeneeded = () => {\r\n                openreq.result.createObjectStore(storeName);\r\n            };\r\n        });\r\n    }\r\n    _withIDBStore(type, callback) {\r\n        return this._dbp.then(db => new Promise((resolve, reject) => {\r\n            const transaction = db.transaction(this.storeName, type);\r\n            transaction.oncomplete = () => resolve();\r\n            transaction.onabort = transaction.onerror = () => reject(transaction.error);\r\n            callback(transaction.objectStore(this.storeName));\r\n        }));\r\n    }\r\n}\r\nlet store;\r\nfunction getDefaultStore() {\r\n    if (!store)\r\n        store = new Store();\r\n    return store;\r\n}\r\nfunction get(key, store = getDefaultStore()) {\r\n    let req;\r\n    return store._withIDBStore('readonly', store => {\r\n        req = store.get(key);\r\n    }).then(() => req.result);\r\n}\r\nfunction set(key, value, store = getDefaultStore()) {\r\n    return store._withIDBStore('readwrite', store => {\r\n        store.put(value, key);\r\n    });\r\n}\r\nfunction del(key, store = getDefaultStore()) {\r\n    return store._withIDBStore('readwrite', store => {\r\n        store.delete(key);\r\n    });\r\n}\r\nfunction clear(store = getDefaultStore()) {\r\n    return store._withIDBStore('readwrite', store => {\r\n        store.clear();\r\n    });\r\n}\r\nfunction keys(store = getDefaultStore()) {\r\n    const keys = [];\r\n    return store._withIDBStore('readonly', store => {\r\n        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.\r\n        // And openKeyCursor isn't supported by Safari.\r\n        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {\r\n            if (!this.result)\r\n                return;\r\n            keys.push(this.result.key);\r\n            this.result.continue();\r\n        };\r\n    }).then(() => keys);\r\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb-keyval/dist/idb-keyval.mjs?");

/***/ })

/******/ });