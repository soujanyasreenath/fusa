var ProductFilter = require("../models/ProductFilter");
var Common = require("../models/Common");
var Search = require("../models/Search");



exports.populate_product_filters = function(request, response) {
  if (request.param('path') != undefined) {
    delete request.param.page, request.param.per_page
    resultsObj = ProductFilter.get_all_products(request, function(results) {
      product_ids = Common.fetch_ids(results["products"], "product")
      Search.get_filters(product_ids, request, function(filters) {
        response.json({ "filters": filters["filters"] });
      });
    });
  }
  else {
    response.json({ "error": "Please provide valid options", "status": 503 });
  }
};

exports.get_filtered_products = function(request, response) {
  if (request.param('options') != undefined) {
    delete request.param.page, request.param.per_page
    resultsObj = ProductFilter.get_all_products(request, function(results) {
      product_ids = Common.fetch_ids(results["products"], "product")
      Search.get_filters(product_ids, request, function(filters) {
        request.param.page = (request.param('page') != undefined ?  Common.compute_offset(request.param('page')) : 0)
        request.param.per_page = (request.param('per_page') != undefined ? request.param('per_page') : 24)
        Search.get_filtered_products(product_ids, request, function(filtered_products) {
          page = Common.paginate(filtered_products["count"], request.param.page, request.param.per_page)
          filtered_sale_ids = Common.fetch_ids(filtered_products["products"], "product")
          response.json({ "products": filtered_sale_ids, "filters": filters["filters"], "page": page });
        });
      });
    });
  }
  else {
    response.json({ "error": "Please provide options", "status": 503 });
  }
};
