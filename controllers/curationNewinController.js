var CurationNewin = require("../models/CurationNewin");

exports.create_bulk = function(request, response) {
  resultsObj = CurationNewin.create(request, 'curation_newin', function(results) {
    response.json(results);
  });
};

exports.index_sales = function(request, response) {
  resultsObj = CurationNewin.get_all_curated_newin_sales(request, function(results) {
    response.json(results);
  });
};

exports.index_tags = function(request, response) {
  resultsObj = CurationNewin.get_all_curated_newin_tags(request, function(results) {
    response.json(results);
  });
};

exports.create = function(request, response) {
  console.log("alllll");
  resultsObj = CurationNewin.create(request, function(results) {
    response.json(results);
  });
};

exports.update = function(request, response) {
  resultsObj = CurationNewin.update(request, function(results) {
    response.json(results);
  });
};

exports.delete = function(request, response) {
  resultsObj = CurationNewin.delete(request, function(results) {
    response.json(results);
  });
};