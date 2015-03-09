var request = require("request");
var mysql = require('mysql');
var Common = require("../models/Common");

exports.get_all_products = function(req, callback) {
  if (req.param('path') != undefined) {
    var count = 0
    var sql = "select distinct product_id from search_products";
    sql = sql + " where path = ?"
    if (req.param.page != undefined && req.param.per_page != undefined) {
      sql = sql + " LIMIT ? OFFSET ? "
    }
    var inserts = [req.param('path'), parseInt(req.param.per_page), parseInt(req.param.page)];
    sql = mysql.format(sql, inserts);
    Common.execute_query(req, sql, function(results) {
      if(results["data"] != undefined) {
        products = results["data"];
        return callback({"products": products, "status": 200});
      }
      else {
        return callback({"Error": results["error"], "status": results["status"]});
      }
    });
  }
  else {
    return callback({"products": "Please provide path" ,"status": 404});
  }
};
