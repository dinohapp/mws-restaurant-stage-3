import {Store, set, get, keys, del} from 'idb-keyval';

let restaurantsDB = new Store('restaurantsDB', 'restaurants');
let reviewsDB = new Store('reviewsDB', 'reviews');

let reviewsToPush = [];
let restaurants = [];

/**
 * Common database helper functions.
 */

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


/*  static gll() {
  let result = [];
  keys('restaurantsDB').then(keys => {
    console.log(keys)
    keys.forEach(key => {
      get(key, restaurantsDB)
      console.log(key)
        .then(restaurantn => {
          console.log(restaurantn)
          result.push(restaurantn);
        })
    })
  })
  return Promise.resolve(result);
};*/

/*  static storedRestaurants(restaurants) {
    let storedRestaurants = restaurants;
    return Promise.resolve(storedRestaurants);
  }*/

  static fetchRestaurants() {
  return keys(restaurantsDB).then(keyz => {
    if(keyz.length == 0) {
      return DBHelper.fetchRest()
      .then(rest =>
        Promise.resolve(rest)
        )
      }
      return get('restaurants', restaurantsDB).then(dbrest => {
        return Promise.resolve(dbrest)
      })
    })
  }

 static fetchRest() {
      return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(restaurants => {
            set('restaurants', restaurants, restaurantsDB)
/*            restaurants.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
        })*/
        return Promise.resolve(restaurants);
      })
  }

/*
  static fetchRestaurants() {
    return(get('restaurants', restaurantsDB))
    .then(restaurants => {
      if (restaurants) {
          return Promise.resolve(restaurants);
      }
      return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(restaurants => {
            set('restaurants', restaurants, restaurantsDB);
            restaurants.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
        })
          return Promise.resolve(restaurants);
      })
    })
  }*/

/*  static fetchRestaurants(callback, id) {
    return(get('id', restaurantsDB))
    .then(dbRestaurants => {
       if (dbRestaurants) {
          return (callback(null, dbRestaurants), dbRestaurants)
       }
       return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(restaurants => {
            restaurants.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
        })
          return (callback(null, restaurants), restaurants);
      })
    })
  }*/

/*static getRestaurantsFromServer() {
      fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
          .then(restaurants => {
            restaurants.forEach(restaurant => {
            set(restaurant.id, restaurant, restaurantsDB);
        })
          return (callback(null, restaurants), restaurants);
      })
}
  static fetchRestaurants(callback, id) {
    keys(restaurantsDB).then(keys => {
    keys.forEach(key => {
      get(key, restaurantsDB)
        .then(restaurantn => {
          dbRestaurants.push(restaurantn);
          return (dbRestaurants);
        })
      })
    })
       if (dbRestaurants.length !== 0) {
          return (callback(null, dbRestaurants), dbRestaurants);
       }
       return DBHelper.getRestaurantsFromServer();
  }*/

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

/*
  static fetchReviews(id) {
  return keys(reviewsDB).then(keyz => {
    if(keyz.length !== 0) {
      return get('reviews', reviewsDB).then(dbrev => {
        if(dbrev.filter(dbrev.restaurant_id === id) !== undefined) {
          return Promise.resolve(dbrev)
        }
      return DBHelper.fetchRev(id)
      .then(rev =>
        Promise.resolve(rev)
        )
      })
      return get('reviews', reviewsDB).then(dbrev => {
        return Promise.resolve(dbrev)
      })
    }
  })
}

 static fetchRev(id) {
      return fetch(`${DBHelper.DATABASE_REVIEWS_URL}/?restaurant_id=${id}`)
      .then(response => response.json())
          .then(reviews => {
            set('reviews', reviews, reviewsDB)
        return Promise.resolve(reviews);
      })
  }*/


  static fetchReviews(id) {
  return keys(reviewsDB).then(keyz => {
    if(keyz.length == 0) {
      return DBHelper.fetchRev(id)
      .then(rev =>
        Promise.resolve(rev)
        )
    }
      return DBHelper.getDBRev(id)
        .then(rev =>
        Promise.resolve(rev)
        )
      })
  }

 static getDBRev(id) {
      return get('reviews', reviewsDB).then(dbrev => {
        if(dbrev.filter(dbr => (dbr.restaurant_id === id)).length !==0) {
            return Promise.resolve(dbrev)
          }
      return DBHelper.fetchRev(id)
      .then(rev =>
        Promise.resolve(rev)
        )
      })
 }

 static fetchRev(id) {
      return fetch(`${DBHelper.DATABASE_REVIEWS_URL}/?restaurant_id=${id}`)
      .then(response => response.json())
          .then(reviews => {
            set('reviews', reviews, reviewsDB)
            set('offlineReviews', [], reviewsDB)
        return Promise.resolve(reviews);
      })
  }

/*  static fetchReviews(id) {
  return keys(reviewsDB).then(keyz => {
    if(keyz.length == 0) {
      return DBHelper.fetchRev(id)
      .then(rev =>
        Promise.resolve(rev)
        )
      }
      return get('reviews', reviewsDB).then(dbrev => {
        return Promise.resolve(dbrev)
      })
    })
  }

 static fetchRev(id) {
      return fetch(`${DBHelper.DATABASE_REVIEWS_URL}/?restaurant_id=${id}`)
      .then(response => response.json())
          .then(reviews => {
            set('reviews', reviews, reviewsDB)
        return Promise.resolve(reviews);
      })
  }*/

  /*static fetchReviews() {
    return(get('reviews', reviewsDB))
    .then(reviews => {
       if (reviews) {
          return Promise.resolve(reviews);
       }
       return fetch(DBHelper.DATABASE_REVIEWS_URL)
      .then(response => response.json())
          .then(reviews => {
            set('reviews', reviews, reviewsDB);
             reviews.forEach(review => {
             set(review.id, review, reviewsDB);
        })
        return Promise.resolve(reviews);
      })
     })
    }
*/
/*  static fetchReviews(callback, rest_id) {
    return(get('rest_id', reviewsDB))
    .then(dbReviews => {
       if (dbReviews) {
          return dbReviews;
       }
       return fetch(DBHelper.DATABASE_REVIEWS_URL)
      .then(response => response.json())
          .then(reviews => {
             reviews.forEach(review => {
             set(review.id, review, reviewsDB);
        })
        return (null, reviews); //callback(null, reviews)
      })
     })
    }*/

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

/*  /**
   * Toggle Favorite status.
   */

  static toggleFavorite(id, favToggle) {
    fetch(`http://localhost:1337/restaurants/${id}/?is_favorite=${favToggle}`, {
      method: 'PUT'
    })
    .then(() => {
      return get('restaurants', restaurantsDB)
      .then(restaurants => {
        const nRestaurants = restaurants.map(rest => rest.id === id ? ({...rest, is_favorite: favToggle})
          : rest);
//        console.log(newRestaurants)
        set('restaurants', nRestaurants, restaurantsDB);
      })
    })
  }

/*  static toggleFavorite(id, favToggle) {
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
   }*/

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id) {
      return DBHelper.fetchRestaurants()
      .then(restaurants => {
          const rid = restaurants.find(r => r.id == id);
      return Promise.resolve(rid);
    })
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine) {
    // Fetch all restaurants  with proper error handling
    return DBHelper.fetchRestaurants()
    .then(restaurants => {
        // Filter restaurants to have only given cuisine type
        const cuisine = restaurants.filter(r => r.cuisine_type == cuisine);
        return Promise.resolve(cuisine);
      })
    }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
    .then(restaurants => {
        // Filter restaurants to have only given neighborhood
       const neighborhood = restaurants.filter(r => r.neighborhood == neighborhood);
       return Promise.resolve(neighborhood);
    })
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
    .then(restaurants => {
        let results = restaurants;
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        return Promise.resolve(results);
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
    .then(restaurants => {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        return Promise.resolve(uniqueNeighborhoods);
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
    .then(restaurants => {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        return Promise.resolve(uniqueCuisines);
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
    return (`/img/${restaurant.photograph}.webp`);
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

/*static gl() {
  return new Promise((resolve, reject) => {
  //func(resolve, reject) => {
  let result = [];
  keys(restaurantsDB).then(keys => {
    keys.forEach(key => {
      get(key, restaurantsDB)
        .then(restaurantn => {
          result.push(restaurantn);
        })
    })
  })
  resolve(result);
  })
};*/

/*static gl() {
  let result = [];
  keys(restaurantsDB).then(keys => {
    keys.forEach(key => {
      get(key, restaurantsDB)
        .then(restaurantn => {
          result.push(restaurantn);
        })
    })
  })
  return result;
};*/

static pushReviewsWhenOnline() {
  return get('offlineReviews', reviewsDB)
      .then(offReviews => {
        offReviews.forEach(review => {
        DBHelper.pushReviewsToDB(review)
        DBHelper.pushReviewsToServer(review)
        })
      })
  set('offlineReviews', [], reviewsDB);
  console.log('offline review posted')
}


static storeOfflineReviews(review) {
  return get('offlineReviews', reviewsDB)
      .then(offReviews => {
        offReviews.push(review);
        console.log('reviews stored offline: ' + offReviews)
        return set('offlineReviews', offReviews, reviewsDB);
    })
  }

static processNewReview(newReview) {
  let review = JSON.parse(newReview);
  let offlineReviewLength = 0;
  get('offlineReviews', reviewsDB).then(offlineRev => {return offlineReviewLength = offlineRev.length});
  console.log(offlineReviewLength)
  return keys(reviewsDB).then(dbKeysArray => {
    review.id = dbKeysArray.length+offlineReviewLength+1;
      if(navigator.onLine == false && offlineReviewLength !== 0) {
        console.log('pushing reviews offline, array:')
        DBHelper.storeOfflineReviews(review);
      }else {
        console.log('pushing review to db and to server')
        DBHelper.pushReviewsToDB(review);
        DBHelper.pushReviewsToServer(review);
      }
  })
}

static pushReviewsToDB(review) {
    console.log(`pushing revew ${review.id} to db`);
    //set(review.id, review, reviewsDB);
      return get('reviews', reviewsDB)
      .then(reviews => {
        reviews.push(review);
/*        const nReviews = reviews.map(rev => rev.id === id ? ({...rev, is_favorite: favToggle})
          : rev);*/
        return set('reviews', reviews, reviewsDB);
      })
}

static pushReviewsToServer(review) {
fetch(DBHelper.DATABASE_REVIEWS_URL, {
      method: 'POST',
      body: JSON.stringify(review)
    })
}

//git test
/*static processNewReview(newReview) {
  let review = JSON.parse(newReview);
  return keys(reviewsDB).then(dbKeysArray => {
    review.id = dbKeysArray.length+reviewsToPush.length+1;
  DBHelper.pushReviewsToDB(review);
  })
}
static pushReviewsToDB(review) {
    console.log('pushing revew # to db', review.id);
    set(review.id, review, reviewsDB);
}*/

/*static getNewReviewID() {
  return keys(reviewsDB).then(dbKeysArray => {
    self.newReviewId = dbKeysArray.length+reviewsToPush.length+1;
    return newReviewId;
  })
}*/
/*static processNewReview(newReview) {
  keys(reviewsDB).then(array => {
    newReviewId = array.length+reviewsToPush.length+1;
  });
  let review = JSON.parse(newReview);
  review["id"] = newReviewId;
  review = JSON.stringify(review);
  reviewsToPush.push(review);
  DBHelper.pushReviewsToDB(reviewsToPush);
}
static pushReviewsToDB(reviewsArray) {
    reviewsArray.forEach(review => {
    //console.log(review);
    set(review.id, review, reviewsDB);
  });
}*/


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