let restaurant,
 review,
 map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL()
  .then(restaurant => {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    })
  .catch(error => console.log('map error' + error));
}

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = () => {
  if (self.restaurant) { // restaurant already fetched!
    return Promise.resolve(self.restaurant);
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    return Promise.reject('No restaurant id in URL')
  } else {
    return DBHelper.fetchRestaurantById(id)
    .then(restaurant => {
      if (restaurant) {
        self.restaurant = restaurant;
        fillRestaurantHTML();
        return Promise.resolve(restaurant);
      }
      return Promise.reject('error getting restaurant with that id')
    });
  }
}


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
const fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img lazyload';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = DBHelper.imageAltForRestaurant(restaurant);


  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  //is_favorite
  let fav = document.createElement('button');
  fav.className = 'favButton';
  if (restaurant.is_favorite == 'true') {fav.innerHTML = '  \u2605'} //\u2605 = dark star
    else {fav.innerHTML = '  \u2606';}
  fav.setAttribute('aria-label', 'add restaurant as favorite');
  fav.onclick = function(){
    if(restaurant.is_favorite == 'false') {
      restaurant.is_favorite = 'true';
      //fav.classList.toggle("isFavTrue");
      fav.innerHTML = '  \u2605';
    }
    else {
      restaurant.is_favorite = 'false';
      fav.innerHTML = '  \u2606';
//      fav.classList.toggle("isFavFalse");
      }
      DBHelper.toggleFavorite(restaurant.id, restaurant.is_favorite);
    }
    name.append(fav);

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  DBHelper.fetchReviews(restaurant.id)
  .then(reviews => {
    self.reviews = reviews.reverse();
    fillReviewsHTML(reviews)
  })
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews) => {
  self.reviews = reviews;
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    if (review.restaurant_id == restaurant.id) {
    ul.appendChild(createReviewHTML(review))
    }
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const li = document.createElement('li');
  if(navigator.onLine == false){
    const offline = document.createElement('p');
    offline.innerHTML = "The review will be posted once online";
    li.appendChild(offline);
  }
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = `${new Date(review.createdAt).toLocaleString()}`;
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.setAttribute('aria-label', 'Breadcrumb');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const addReviewToggle = () => {
  const reviewToggle = document.getElementById('reviewToggle');
  if(reviewToggle.style.display == 'block') {
    reviewToggle.style.display = 'none';
  } else {
    reviewToggle.style.display = 'block';
  }
}

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

const addReview = () => {
  event.preventDefault();
  let restaurant_id = restaurant.id;
  let name = document.getElementById('author').value;
  let rating = document.querySelector('#rating option:checked').value;
  let comments = document.getElementById('comment').value;
  let id = '';
  const reviewObject = {
    restaurant_id: restaurant_id,
    name: name,
    rating: rating,
    comments: comments,
    id: id,
    createdAt: new Date()
  }
    window.addEventListener("online", () => {
      DBHelper.pushReviewsWhenOnline();
    })
    DBHelper.processNewReview(JSON.stringify(reviewObject));

  const reviewsContainer = document.getElementById('reviews-container');
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.insertBefore(createReviewHTML(reviewObject), reviewsList.firstChild);
  reviewsContainer.appendChild(reviewsList);

  document.getElementById('addReviewForm').reset();
  addReviewToggle();
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
