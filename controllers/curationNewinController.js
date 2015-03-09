var CurationNewin = require("../models/CurationNewin");

exports.index = function(request, response) {
  resultsObj = CurationNewin.get_all_curated_newins(request, function(results) {
    response.json(results);
  });
};

exports.create = function(request, response) {
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