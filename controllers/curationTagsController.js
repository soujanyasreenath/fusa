var CurationTags = require("../models/CurationTags");

exports.create_bulk = function(request, response) {
  resultsObj = CurationTags.create(request, 'curation_tags', function(results) {
    response.json(results);
  });
};

exports.index = function(request, response) {
  resultsObj = CurationTags.get_all_curated_tags(request, function(results) {
    response.json(results);
  });
};

exports.create = function(request, response) {
  resultsObj = CurationTags.create(request, function(results) {
    response.json(results);
  });
};

exports.update = function(request, response) {
  resultsObj = CurationTags.update(request, function(results) {
    response.json(results);
  });
};

exports.delete = function(request, response) {
  resultsObj = CurationTags.delete(request, function(results) {
    response.json(results);
  });
};