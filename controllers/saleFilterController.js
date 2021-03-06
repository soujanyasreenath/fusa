var SaleFilter = require("../models/SaleFilter");
var Common = require("../models/Common");


exports.populate_sale_filters = function(request, response) {
  if (request.param('path') != undefined) {
    delete request.param.page, request.param.per_page
    resultsObj = SaleFilter.get_all_sales(request, function(results) {
      sale_ids = Common.fetch_ids(results["sales"], "sale")
      SaleFilter.get_sale_filters(sale_ids, request, function(filters) {
        response.json({ "filters": filters["filters"] });
      });
    });
  }
  else {
    response.json({ "error": "Please provide valid options", "status": 503 });
  }
};

exports.get_filtered_sales = function(request, response) {
  if (request.param('options') != undefined) {
    delete request.param.page, request.param.per_page
    resultsObj = SaleFilter.get_all_sales(request, function(results) {
      sale_ids = Common.fetch_ids(results["sales"], "sale")
      SaleFilter.get_sale_filters(sale_ids, request, function(filters) {
        request.param.page = (request.param('page') != undefined ?  Common.compute_offset(request.param('page')) : 0)
        request.param.per_page = (request.param('per_page') != undefined ? request.param('per_page') : 24)
        SaleFilter.get_filtered_sales(sale_ids, request, function(filtered_sales) {
          page_data = request.param('page') != undefined ? request.param('page') : 1
          page = Common.paginate(filtered_sales["count"], page_data, request.param.per_page)
          filtered_sale_ids = Common.fetch_ids(filtered_sales["sales"], "sale")
          response.json({ "sales": filtered_sale_ids, "filters": filters["filters"], "page": page });
        });
      });
    });
  }
  else {
    response.json({ "error": "Please provide options", "status": 503 });
  }
};
