let restaurants,
  neighborhoods,
  cuisines;
var map;
var markers = [];

//var DBHelper = import(dbhelper);

//class DBHelper = () => {};
/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
  DBHelper.fetchRestaurants();
  DBHelper.fetchReviews();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods()
  .then(neighborhoods => {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
  })
  .catch(error => console.log(error));
}

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
  DBHelper.fetchCuisines()
  .then(cuisines => {
      self.cuisines = cuisines;
      fillCuisinesHTML();
  })
  .catch(error => console.log('cuisines error' + error));
}

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
    updateRestaurants();
}

/**
 * Initialize Google map, called from HTML.
 */
/*window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false

  });
  updateRestaurants();
}
*/
/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = (restaurants = self.restaurants) => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood)
  .then(restaurants => {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img lazyload';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = DBHelper.imageAltForRestaurant(restaurant);
  li.append(image);

  const name = document.createElement('h2');
  name.innerHTML = restaurant.name;
  li.append(name);

//is_favorite
  let fav = document.createElement('button');
  fav.className = 'favButton';
  li.append(fav);
  if (restaurant.is_favorite == 'true') {fav.innerHTML = '★'}
    else {fav.innerHTML = '☆';}
  fav.setAttribute('aria-label', 'add restaurant as favorite');
  fav.onclick = function(){
    if(restaurant.is_favorite == 'false') {
      restaurant.is_favorite = 'true';
      //fav.classList.toggle("isFavTrue");
      fav.innerHTML = '★';
    }
    else {
      restaurant.is_favorite = 'false';
      fav.innerHTML = '☆';
//      fav.classList.toggle("isFavFalse");
      }
      DBHelper.toggleFavorite(restaurant.id, restaurant.is_favorite);
    }

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)

  return li
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });

}

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}

/**
 * Register service worker
 */

if (navigator.serviceWorker) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../sw.js').catch(function(error) {
    console.log('SW registration failed with error: ' + error);
    })
  });
};