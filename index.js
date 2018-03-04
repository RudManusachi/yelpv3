"use strict";

var request = require('request');

const baseUrl = 'https://api.yelp.com/v3/';

class Yelpv3 {

  constructor(opts) {
    this.API_KEY = opts.API_KEY;
  }

  get(resource, params, callback) {
    params = (typeof params === 'undefined') ? {} : params;

    const promise = new Promise((resolve, reject) => {
      request.get({
        url: baseUrl + resource + jsonToQueryString(params),
        headers: {
          'Authorization': 'Bearer ' + this.API_KEY
        }
      }, (err, response, data) => {
        if (!err && response.statusCode == 200) {
          resolve(JSON.parse(data));
        }
        reject(err);
      });
    });

    if (typeof callback === 'function') {
      promise
        .then((res) => callback(null, res))
        .catch((err) => callback(err));
      return null;
    }

    return promise;
  }

  search(params, callback) {
    return this.get('businesses/search', params, callback);
  }

  phoneSearch(params, callback) {
    return this.get('businesses/search/phone', params, callback);
  }

  transactionSearch(transactionType, params, callback) {
    return this.get(`transactions/${transactionType}/search`, params, callback);
  }

  business(id, callback) {
    return this.get(`businesses/${id}`, undefined, callback);
  }

  reviews(id, callback) {
    return this.get(`businesses/${id}/reviews`, undefined, callback);
  }

  autocomplete(params, callback) {
    return this.get('autocomplete', params, callback);
  }

}

function jsonToQueryString(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
}

module.exports = Yelpv3;
