var Search = require("../models/Search");

exports.get_search_filters = function(request,response) {
  resultsObj = Search.get_search(request,function(results) {
    product_ids = fetch_ids(results["products"])
    Search.get_filters(product_ids,request,function(filters) {
      response.json({"products":product_ids,"filters":filters["filters"]});
    });
  });
};


exports.get_filtered_products = function(request,response) {
  resultsObj = Search.get_search(request,function(results) {
    product_ids = fetch_ids(results["products"])
    Search.get_filters(product_ids,request,function(filters) {
      Search.get_filtered_products(product_ids,request,function(filtered_products) {
        filtered_product_ids = fetch_ids(filtered_products["products"])
        response.json({"products":filtered_product_ids,"filters":filters["filters"]});
      });
    });
  });
};


function fetch_ids(data){
  var ids =[];
  for(var key in data) {
    ids.push(data[key]["product_id"]);
  }
  return ids;
}
