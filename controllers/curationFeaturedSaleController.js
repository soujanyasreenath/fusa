var CurationFeaturedSale = require("../models/CurationFeaturedSale");
var CurationData = require("../models/CurationData");

exports.create_bulk = function(request, response) {
  resultsObj = CurationData.create(request, 'curation_featured_sale', function(results) {
    response.json(results);
  });
};

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