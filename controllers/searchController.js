var Search = require("../models/Search");

exports.get_search_filters = function(request,response) {
  resultsObj = Search.get_search_filters(request,function(results) {
    response.json(results["products"]);
  });
};
