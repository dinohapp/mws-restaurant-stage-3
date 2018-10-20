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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/sw.js":
/*!**********************!*\
  !*** ./assets/sw.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//import {Store, set, get} from 'idb-keyval';\n\nself.addEventListener('install', function(event) {\n\tlet cachedURLs = [\n\t\t'/',\n\t\t'index.html',\n\t\t'restaurant.html',\n\t\t'css/styles.css',\n\t\t'js/dbhelper.js',\n\t\t'js/main.js',\n\t\t'js/restaurant_info.js',\n\t\t'img/1.jpg',\n\t\t'img/2.jpg',\n\t\t'img/3.jpg',\n\t\t'img/4.jpg',\n\t\t'img/5.jpg',\n\t\t'img/6.jpg',\n\t\t'img/7.jpg',\n\t\t'img/8.jpg',\n\t\t'img/9.jpg',\n\t\t'img/10.jpg',\n\t\t'img/undefined.jpg',\n\t\t'img/icon-192.png',\n\t\t'img/icon-512.png'\n\t\t// 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2',\n\t\t// 'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2'\n\t];\n\n\tevent.waitUntil(\n\t\tcaches.open('v1').then(cache => {\n\t\t\treturn cache.addAll(cachedURLs);\n\t\t})\n\t);\n});\n\n\nself.addEventListener('fetch', event => {\n\tevent.respondWith(\n    caches.match(event.request).then(function(response) {\n      if (response) return response;\n      return fetch(event.request)\n      .then(resp => {\n      \tif(!resp || resp.status !== 200 || resp.type !== 'basic') {\n      \t\treturn resp;\n      \t}\n      \treturn caches.open('v1').then(cache => {\n      \t\tcache.put(event.request, resp.clone())\n      \t\treturn resp;\n      \t\t})\n      \t})\n      })\n    );\n   });\n\n\n// if request NOT equals /restaurants/ look in sw caches and return, if not in caches then fetch, else serve from IDB\n\n/*\nSo in Project 2 you'll ultimately be checking to see if your restaurant data is in the db first. If it is, show that. If it's not, fetch it from the internet, stuff it in the db, and then show it.\n\n1 make a request\n2 check if the request is in caches. if it is, return,\n3 check if request is in idb, if it is return,\n4 if 2 and 3 false, put it in caches and idb then return\n*/\n\n/*self.addEventListener('fetch', event => {\n\tconst rURL = new URL(event.request.url);\n\tconst revURL = new URL('http://localhost:1337/reviews')\n\t if (event.request.url.includes('restaurants') == true) {\n \t\tevent.respondWith(\n \t\t\tidbRestaurantHandler(event.request),\n \t\t\tidbReviewsHandler(revURL));\n\t }\n\t //else if (event.request.url.indexOf('reviews') !== -1)\n\t else if (event.request.url.includes('reviews') == true) {\n \t\tevent.respondWith(\n \t\t\tidbReviewsHandler(revURL));\n \t}\n\telse {\n\t\tevent.waitUntil(\n\t\t\t\tcachesHandler(event));\n\t}\n\n});\n\nconst idbRestaurantHandler = request => {\n\tconst restaurantsDB = new Store('restaurantsDB', 'restaurants');\n\treturn get('restaurants', restaurantsDB)\n\t\t.then(restaurants => {\n\t\t\tif (restaurants) return restaurants;\n\t\t\treturn fetch(request)\n\t\t\t.then(response => response.json())\n\t\t\t.then(setRest => {\n\t\t\t\tset('restaurants', setRest, restaurantsDB);\n\t\t\t\tsetRest.forEach(restaurant => {\n\t\t\t\t\tset(restaurant.id, restaurant, restaurantsDB);\n\t\t\t\t});\n\t\t\t\treturn setRest;\n\t\t\t})\n\t\t})\n\t\t.then(response => new Response(JSON.stringify(response)));\n};\n\nconst idbReviewsHandler = request => {\n\tconst reviewsDB = new Store('restaurantsDB', 'restaurants');\n\t\treturn get('reviews', reviewsDB)\n\t\t.then(reviews => {\n\t\t\tif (reviews) return reviews;\n\t\t\treturn fetch(request)\n\t\t\t.then(response => response.json())\n\t\t\t.then(setRev => {\n\t\t\t\tset('reviews', setRev, reviewsDB);\n\t\t\t\tsetRev.forEach(review => {\n\t\t\t\t\tset(review.restaurant_id, review, reviewsDB);\n\t\t\t\t});\n\t\t\t\treturn setRev;\n\t\t\t})\n\t\t})\n\t\t.then(response => new Response(JSON.stringify(response)));\n\t}\n\nconst cachesHandler = event => {\n\tevent.respondWith(\n    caches.match(event.request).then(function(response) {\n      if (response) return response;\n      return fetch(event.request)\n      .then(resp => {\n      \tif(!resp || resp.status !== 200 || resp.type !== 'basic') {\n      \t\treturn resp;\n      \t}\n      \treturn caches.open('v1').then(cache => {\n      \t\tcache.put(event.request, resp.clone())\n      \t\treturn resp;\n      \t\t})\n      \t})\n      })\n    );\n};*/\n\n\n\n\n/*const idbRestaurantHandler = request => {\n\treturn get('restaurants')\n\t\t.then(restaurants => {\n\t\t\tif (restaurants) return restaurants;\n\t\t\treturn fetch(request)\n\t\t\t.then(response => response.json())\n\t\t\t.then(setRest => {\n\t\t\t\tset('restaurants', setRest);\n\t\t\t\tsetRest.forEach(restaurant => {\n\t\t\t\t\tset(restaurant.id, restaurant);\n\t\t\t\t});\n\t\t\t\treturn setRest;\n\t\t\t})\n\t\t})\n\t\t.then(response => new Response(JSON.stringify(response)));\n\t\tconsole.log('test1')\n};*/\n\n/*\n//original\nself.addEventListener('fetch', function(event) {\n  event.respondWith(\n    caches.match(event.request).then(function(response) {\n      if (response) return response;\n      return fetch(event.request);\n      })\n  );\n */\n\n\n\n//# sourceURL=webpack:///./assets/sw.js?");

/***/ })

/******/ });