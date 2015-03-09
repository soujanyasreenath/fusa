var CurationFeaturedSale = require("../models/CurationFeaturedSale");

exports.index = function(request, response) {
  resultsObj = CurationFeaturedSale.get_all_curated_featured_sales(request, function(results) {
  	response.json(results);
  });
};

exports.create = function(request, response) {
  resultsObj = CurationFeaturedSale.create(request, function(results) {
  	response.json(results);
  });
};

exports.update = function(request, response) {
  resultsObj = CurationFeaturedSale.update(request, function(results) {
  	response.json(results);
  });
};

exports.delete = function(request, response) {
  resultsObj = CurationFeaturedSale.delete(request, function(results) {
  	response.json(results);
  });
};