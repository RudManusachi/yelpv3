const test = require('blue-tape');
const Yelpv3 = require('../index.js');

const yelp = new Yelpv3({
  app_id: process.env.APP_ID,
  app_secret: process.env.APP_SECRET
})

test('yelp reviews', t => {
  return yelp.reviews("los-angeles-mattress-stores-los-angeles-6").then(data => {
    t.ok(Array.isArray(data.reviews), "reviews is array");
    t.equal(typeof data.reviews[0].rating, 'number', "rating is number");
    t.equal(typeof data.reviews[0].user, 'object', "user is object");
    t.equal(typeof data.reviews[0].text, 'string', "text is string");
    t.equal(typeof data.reviews[0].time_created, 'string', 'time_created is string');
    t.equal(typeof data.reviews[0].url, 'string', "url is string");
  }).catch(err => {
    console.error(err);
  });
});

test('yelp search', t => {
  return yelp.search({
    term: 'LA Mattress',
    location: 'Los Angeles'
  }).then(data => {
    t.equal(typeof data.total, 'number', 'total is number');
    t.ok(Array.isArray(data.businesses), "businesses is array");
  }).catch((err) => {
    t.error(err);
  });
});

test('yelp phone search', t => {
  return yelp.phoneSearch({
    phone: "+12135683618"
  }).then(data => {
    t.equal(typeof data.total, 'number', 'total is number');
    t.ok(Array.isArray(data.businesses), "businesses is array");
  }).catch((err) => {
    t.error(err);
  });
});

test('yelp transaction search', t => {
  return yelp.transactionSearch("delivery", {
    location: "Los Angeles"
  }).then(data => {
    t.equal(typeof data.total, 'number', 'total is number');
    t.ok(Array.isArray(data.businesses), "businesses is array");
  }).catch((err) => {
    t.error(err);
  });
});

test('yelp business', t => {
  return yelp.business("los-angeles-mattress-stores-los-angeles-6").then(data => {
    t.equal(typeof data.id, 'string', 'id is string');
    t.equal(typeof data.name, 'string', 'name is string');
    t.equal(typeof data.image_url, 'string', 'image_url is string');
    t.equal(typeof data.is_claimed, 'boolean', 'is_claimed is boolean');
    t.equal(typeof data.is_closed, 'boolean', 'is_closed is boolean');
    t.equal(typeof data.url, 'string', 'url is string');
    t.equal(typeof data.price, 'string', 'price is string');
    t.equal(typeof data.rating, 'number', 'rating is number');
    t.equal(typeof data.review_count, 'number', 'review_count is number');
    t.equal(typeof data.phone, 'string', 'phone is string');
    t.ok(Array.isArray(data.photos), 'phhotos is array');
    t.ok(Array.isArray(data.hours), 'hours is array');
    t.ok(Array.isArray(data.categories), 'categories is array');
    t.equal(typeof data.coordinates, 'object', 'coordinates is object');
    t.equal(typeof data.location, 'object', 'location is object');
  }).catch((err) => {
    t.error(err);
  });
});

test('yelp autocomplete', t => {
  return yelp.autocomplete({
    text: "LA Mattress",
  }).then(data => {
    t.ok(Array.isArray(data.terms), "terms is array");
    t.ok(Array.isArray(data.businesses), "businesses is array");
    t.ok(Array.isArray(data.categories), "categories is array");
  }).catch((err) => {
    t.error(err);
  });
});
