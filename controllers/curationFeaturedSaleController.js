var CurationData = require("../models/CurationData");

exports.index = function(request, response) {
  resultsObj = CurationData.get_all_curated_data(request, 'curation_featured_sale', function(results) {
    response.json(results);
  });
};

exports.create = function(request, response) {
  resultsObj = CurationData.create(request, 'curation_featured_sale', function(results) {
    response.json(results);
  });
};