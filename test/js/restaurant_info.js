'use strict';

var restaurant = void 0;
var review = void 0;
var map = void 0;

if (navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('../sw.js').catch(function (error) {
      console.log('SW registration failed with error: ' + error);
    });
  });
};

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = function () {
  fetchRestaurantFromURL(function (error, restaurant) {
    if (error) {
      // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
};

/**
 * Get current restaurant from page URL.
 */
var fetchRestaurantFromURL = function fetchRestaurantFromURL(callback) {
  if (self.restaurant) {
    // restaurant already fetched!
    callback(null, self.restaurant);
    return;
  }
  var id = getParameterByName('id');
  if (!id) {
    // no id found in URL
    error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, function (error, restaurant) {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant);
    });
  }
};

/**
 * Get current reviews from page URL.
 */
/*const fetchReviewsFromURL = (callback) => {
  if (self.reviews) { // restaurant already fetched!
    callback(null, self.reviews)
    return;
  }
  const id = getParameterByName('restaurant_id');
  if (!restaurant_id) { // no id found in URL
    error = 'No review in URL'
    callback(error, null);
  } else {
    DBHelper.fetchReviewsById(id, (error, reveiws) => {
      self.reviews = reviews;
      if (!reviews) {
        console.error(error);
        return;
      }
      fillReviewsHTML();
      callback(null, reviews)
    });
  }
}*/

/**
 * Create restaurant HTML and add it to the webpage
 */
var fillRestaurantHTML = function fillRestaurantHTML() {
  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;

  var name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  //is_favorite
  var fav = document.createElement('button');
  fav.className = 'favButton';
  name.append(fav);
  if (restaurant.is_favorite == 'true') {
    fav.innerHTML = '★';
  } else {
    fav.innerHTML = '☆';
  }
  fav.setAttribute('aria-label', 'add restaurant as favorite');
  fav.onclick = function () {
    if (restaurant.is_favorite == 'false') {
      restaurant.is_favorite = 'true';
      //fav.classList.toggle("isFavTrue");
      fav.innerHTML = '★';
    } else {
      restaurant.is_favorite = 'false';
      fav.innerHTML = '☆';
      //      fav.classList.toggle("isFavFalse");
    }
    DBHelper.toggleFavorite(restaurant.id, restaurant.is_favorite);
  };

  /*    const fav = document.createElement('button');
    fav.className = 'favButton';
    fav.innerHTML = '☆';//&#2605-06
    name.append(fav);
    fav.setAttribute('aria-label', 'add restaurant as favorite');
    fav.onclick = function(){
      if(restaurant.is_favorite == false) {
        restaurant.is_favorite = true;
        fav.innerHTML = '★';
        fav.classList.toggle("isFavTrue");
      }
      else {
        restaurant.is_favorite = false;
        fav.innerHTML = '☆';
  //      fav.classList.toggle("isFavFalse");
        }
              //const favToggle = restaurant.is_favorite = true;
        //DBHelper.toggleFavorite(restaurant.id, favToggle);
      }*/

  var address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  var image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img lazyload';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = DBHelper.imageAltForRestaurant(restaurant);

  var cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  DBHelper.fetchReviews().then(function (reviews) {
    self.reviews = reviews;
    fillReviewsHTML(reviews);
  });
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
var fillRestaurantHoursHTML = function fillRestaurantHoursHTML() {
  var operatingHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.operating_hours;

  var hours = document.getElementById('restaurant-hours');
  for (var key in operatingHours) {
    var row = document.createElement('tr');

    var day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    var time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
var fillReviewsHTML = function fillReviewsHTML(reviews) {
  self.reviews = reviews;
  var container = document.getElementById('reviews-container');
  var title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    var noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  var ul = document.getElementById('reviews-list');
  reviews.forEach(function (review) {
    if (review.restaurant_id == restaurant.id) {
      ul.appendChild(createReviewHTML(review));
    }
  });
  container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
var createReviewHTML = function createReviewHTML() {
  var review = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.reviews;

  var li = document.createElement('li');
  var name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  var date = document.createElement('p');
  date.innerHTML = '' + new Date(review.createdAt).toLocaleString();
  li.appendChild(date);

  var rating = document.createElement('p');
  rating.innerHTML = 'Rating: ' + review.rating;
  li.appendChild(rating);

  var comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
var fillBreadcrumb = function fillBreadcrumb() {
  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;

  var breadcrumb = document.getElementById('breadcrumb');
  var li = document.createElement('li');
  li.setAttribute('aria-label', 'Breadcrumb');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Get a parameter by name from page URL.
 */
var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

var addReviewToggle = function addReviewToggle() {
  var reviewToggle = document.getElementById('addReview');
  if (reviewToggle.style.display == 'none') {
    reviewToggle.style.display = 'block';
  } else {
    reviewToggle.style.display = 'none';
  }
};

var addReview = function addReview(event) {
  event.preventDefault();
  //TODO 'ADD REVIEW LOGIC'
};