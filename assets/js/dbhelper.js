import {Store, set, get, keys} from 'idb-keyval';

/**
 * Common database helper functions.
 */



const restaurantsDB = new Store('restaurantsDB', 'restaurants');
const reviewsDB = new Store('reviewsDB', 'reviews');

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */

//LINKS
/*
fav
http://localhost:1337/restaurants/?is_favorite=true

reviews for certain restaurant
http://localhost:1337/reviews/?restaurant_id=<restaurant_id>

get all reviews
http://localhost:1337/reviews/


object format
{
    "restaurant_id": <restaurant_id>,
    "name": <reviewer_name>,
    "rating": <rating>,
    "comments": <comment_text>
}
*/

   //***TODO FETCH REVIEWS FROM SERVER***//
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  static get DATABASE_REVIEWS_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/reviews`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback, id) {
    return(get('restaurants', restaurantsDB))
    .then(function(restaurants){
       if (restaurants) {
          return (restaurants, callback(null, restaurants))
       }
       return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(restaurants => {
            restaurants.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
          return (callback(null, restaurants), restaurants);
        })
      })
    })
  }


/*  static fetchRestaurants(callback, id) {
    return(get('restaurants', restaurantsDB))
    .then(function(restaurants){
       if (restaurants) {
          return (restaurants, callback(null, restaurants))
       }
       return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(function setRest(rest) {
            set('restaurants', rest, restaurantsDB);
          return (callback(null, rest), rest);
        })
      });
    }*/

/* static idbRestaurantHandler() {
  const restaurantsDB = new Store('restaurantsDB', 'restaurants');
  return fetch(DBHelper.DATABASE_URL)
  .then(response => response.json())
      .then(function setRest(rest) {
        set('restaurants', rest, restaurantsDB);
          rest.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
            return rest;
        });
      })
};*/


  static fetchReviews(callback, rest_id) {
    return(get('reviews', reviewsDB))
    .then(function(reviews){
       if (reviews) {
          return reviews;
       }
       return fetch(DBHelper.DATABASE_REVIEWS_URL)
      .then(response => response.json())
          .then(reviews => {
            console.log(reviews);
            reviews.forEach(review => {
              console.log(review);
            set(review.id, review, reviewsDB);
          return (callback(null, reviews), reviews);
        })
      })
     })
    }

/*
  static fetchReviews(callback, id) {
    return DBHelper.getReviewsFromDB()
    .then(function(reviews){
       if (reviews) {
          return reviews, callback(null, reviews)
       }
       return DBHelper.idbReviewsHandler();
      });
    }


 static idbReviewsHandler(id) {
  const reviewsDB = new Store('restaurantsDB', 'restaurants');
  return fetch(DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + 1)
  .then(response => response.json())
      .then(function setRev(rev) {
        set('reviews', rev, reviewsDB);
          rev.forEach(review => {
            set(review.restaurant_id, review, reviewsDB);
            return rev;
        });
      })
};
*/

/*static fetchReviews(callback, id) {
    //let fURL = DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id;
    let fURL = 'http://localhost:1337/reviews' + '/?restaurant_id='+ 1;
    fetch(fURL, {method: 'GET'})
    .then(function(response){
      //let resp = JSON.parse(response);
      //let restaurants = resp.json();
      response.json()
    .then(function(reviews){
      callback(null, reviews);
      });
    })
    .catch(function(error) {
      callback(`Error, ${error.statusText}`, null)
    })
  };*/

/*static idbReviewsHandler = request => {
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
  }*/



/*fetch("http://localhost:1337/reviews/?restaurant_id=1", {method: 'GET'})
.then(function(response){console.log(response.json())})*/



/*static fetchReviews(callback, id) {
  fetch(DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id, {method: 'GET'})
    .then(function(response){
      response.json;
      console.log(response.json())
    })
    .then(function(reviews){
      console.log(response.json())
      callback(null, reviews)
    })
    .catch(function(error) {
      callback(`Error, ${error.statusText}`, null)
    })
  }*/
  /*static fetchReviews(callback, id) {
    //let fURL = DBHelper.DATABASE_REVIEWS_URL + '/?restaurant_id=' + id;
    let fURL = 'http://localhost:1337/reviews' + id.restaurant_id;
    fetch(fURL, {method: 'GET'})
    .then(function(response){
      //let resp = JSON.parse(response);
      //let restaurants = resp.json();
      response.json()
    .then(function(reviews){
      callback(null, reviews);
      });
    })
    .catch(function(error) {
      callback(`Error, ${error.statusText}`, null)
    })
  };*/

  /**
   * Toggle Favorite status.
   */
  static toggleFavorite(id, favToggle) {
    fetch(`http://localhost:1337/restaurants/${id}/?is_favorite=${favToggle}`, {
      method: 'PUT'
    })
    .then(() => {
      get(id, restaurantsDB)
      .then(restaurant => {
        restaurant.is_favorite = favToggle;
        set(id, restaurant, restaurantsDB);
      })
    })
   }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
          const restaurant = restaurants.find(r => r.id == id);
//        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
      })//    }, id);
  }

  static fetchReviewsById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchReviews((error, reviews) => {
      if (error) {
        callback(error, null);
      } else {
          const review = reviews.find(r => r.id == id.restaurant_id);
/*          const review2 = reviews.find(r => r.restaurant_id == id);
          const review3 = reviews.find(r => r.id == id);
          console.log(review);
          console.log(review2);
          console.log(review3);*/
//        const restaurant = restaurants.find(r => r.id == id);
        if (review) { // Got the restaurant
          callback(null, review);
          console.log(review);
        } else { // Restaurant does not exist in the database
          callback('Review does not exist', null);
          console.log('no reviews')
        }
      }
      });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}.jpg`);
  }

  /**
   * Restaurant image alt text.
   */
  static imageAltForRestaurant(restaurant) {
    return (`${restaurant.photograph_description}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }
}
window.DBHelper = DBHelper;
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    matchCaches(event.request),
    idbRestaurantHandler(event.request)

    );
   });

const matchCaches = event => {
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
};

const idbRestaurantHandler = request => {

  fetch(event.request).catch(result => {
    return get('restaurants', restaurantsDB)
    .then(restaurants => {
      if (restaurants) return restaurants;
      return fetch(request)
      .then(response => response.json())
      .then(setRest => {
        set(setRest, restaurantsDB);
        setRest.forEach(restaurant => {
          set(restaurant.id, restaurant, restaurantsDB);
          });
        return setRest;
        })
      })
    .then(response => new Response(JSON.stringify(response)));
  }
)};*/