var ProductFilter = require("../models/ProductFilter");
var Common = require("../models/Common");
var Search = require("../models/Search");



exports.get_product_filters = function(request,response) {
  delete request.param.page,request.param.per_page
  resultsObj = ProductFilter.get_all_products(request,function(results) {
    product_ids = Common.fetch_ids(results["products"],"product")
    Search.get_filters(product_ids,request,function(filters) {
      request.param.page =(request.param('page')!=undefined ? Common.compute_offset(request.param('page')) : 0)
      request.param.per_page =(request.param('per_page')!=undefined ? request.param('per_page') : 24)
      ProductFilter.get_all_products(request,function(paginated_products) {
        page = Common.paginate(paginated_products["count"],request.param.page,request.param.per_page)
        paginated_product_ids = Common.fetch_ids(paginated_products["products"],"product")
        response.json({"products":paginated_product_ids,"filters":filters["filters"],"page":page});
      });
    });
  });
};

exports.get_filtered_products = function(request,response) {
  delete request.param.page,request.param.per_page
  resultsObj = ProductFilter.get_all_products(request,function(results) {
    product_ids = Common.fetch_ids(results["products"],"product")
    Search.get_filters(product_ids,request,function(filters) {
      request.param.page =(request.param('page')!=undefined ?  Common.compute_offset(request.param('page')) : 0)
      request.param.per_page =(request.param('per_page')!=undefined ? request.param('per_page') : 24)
      Search.get_filtered_products(product_ids,request,function(filtered_products) {
        page = Common.paginate(filtered_products["count"],request.param.page,request.param.per_page)
        filtered_sale_ids = Common.fetch_ids(filtered_products["products"],"product")
        response.json({"products":filtered_sale_ids,"filters":filters["filters"],"page":page});
      });
    });
  });
};