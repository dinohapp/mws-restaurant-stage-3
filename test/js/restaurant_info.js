'use strict';

var restaurant = void 0,
    review = void 0,
    map = void 0;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = function () {
  fetchRestaurantFromURL().then(function (restaurant) {
    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: restaurant.latlng,
      scrollwheel: false
    });
    fillBreadcrumb();
    DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
  }).catch(function (error) {
    return console.log('map error' + error);
  });
};

/**
 * Get current restaurant from page URL.
 */
var fetchRestaurantFromURL = function fetchRestaurantFromURL() {
  if (self.restaurant) {
    // restaurant already fetched!
    return Promise.resolve(self.restaurant);
  }
  var id = getParameterByName('id');
  if (!id) {
    // no id found in URL
    return Promise.reject('No restaurant id in URL');
  } else {
    return DBHelper.fetchRestaurantById(id).then(function (restaurant) {
      if (restaurant) {
        self.restaurant = restaurant;
        fillRestaurantHTML();
        return Promise.resolve(restaurant);
      }
      return Promise.reject('error getting restaurant with that id');
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

  var address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  var image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img lazyload';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = DBHelper.imageAltForRestaurant(restaurant);

  var cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  //is_favorite
  var fav = document.createElement('button');
  fav.className = 'favButton';
  if (restaurant.is_favorite == 'true') {
    fav.innerHTML = '  \u2605';
  } else {
    fav.innerHTML = '  \u2606';
  }
  fav.setAttribute('aria-label', 'add restaurant as favorite');
  fav.onclick = function () {
    if (restaurant.is_favorite == 'false') {
      restaurant.is_favorite = 'true';
      //fav.classList.toggle("isFavTrue");
      fav.innerHTML = '  \u2605';
    } else {
      restaurant.is_favorite = 'false';
      fav.innerHTML = '  \u2606';
      //      fav.classList.toggle("isFavFalse");
    }
    DBHelper.toggleFavorite(restaurant.id, restaurant.is_favorite);
  };
  name.append(fav);

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  DBHelper.fetchReviews(restaurant.id).then(function (reviews) {
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
var createReviewHTML = function createReviewHTML(review) {
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
  var reviewToggle = document.getElementById('reviewToggle');
  if (reviewToggle.style.display == 'block') {
    reviewToggle.style.display = 'none';
  } else {
    reviewToggle.style.display = 'block';
  }
};

/*
object format
{
    "comments": <comment_text>
    createdAt
    id
    "name": <reviewer_name>,
    "rating": <rating>,
    "restaurant_id": <restaurant_id>,
    updatedAt


}
*/

var addReview = function addReview() {
  event.preventDefault();
  var restaurant_id = restaurant.id;
  var name = document.getElementById('author').value;
  var rating = document.querySelector('#rating option:checked').value;
  var comments = document.getElementById('comment').value;
  var id = '';
  var reviewObject = {
    restaurant_id: restaurant_id,
    name: name,
    rating: rating,
    comments: comments,
    id: id,
    createdAt: new Date()
  };
  window.addEventListener("online", function () {
    DBHelper.pushReviewsWhenOnline();
    //TODO remove notificaiton about offline comment once its been pushed
  });
  //TODO add a comment that review will be pushed when online
  DBHelper.processNewReview(JSON.stringify(reviewObject));

  var reviewsContainer = document.getElementById('reviews-container');
  var reviewsList = document.getElementById('reviews-list');
  reviewsList.insertBefore(createReviewHTML(reviewObject), reviewsList.firstChild);
  reviewsContainer.appendChild(reviewsList);

  document.getElementById('addReviewForm').reset();
  addReviewToggle();
};

/**
 * Register service worker
 */

if (navigator.serviceWorker) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('../sw.js').catch(function (error) {
      console.log('SW registration failed with error: ' + error);
    });
  });
};