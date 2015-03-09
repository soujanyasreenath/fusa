var request = require("request");
var mysql = require('mysql');
var Common = require("../models/Common");

exports.get_all_sales = function(req, callback) {
  if(req.param('path') != undefined) {
    var count = 0;
    var sql = "select distinct sale_id from search_sales";
    sql = sql + " where path = ?"
    if (req.param.page != undefined && req.param.per_page != undefined) {
      sql = sql + " LIMIT ? OFFSET ? "
    }
    var inserts = [req.param('path'), parseInt(req.param.per_page), parseInt(req.param.page)];
    sql = mysql.format(sql, inserts);
    Common.execute_query(req, sql, function(results) {
      if(results["data"] != undefined) {
        sales = results["data"];
        return callback({"sales": sales, "status": 200});
      }
      else {
        return callback({"Error": results["error"], "status": results["status"]});
      }
    });
  }
  else {
    return callback({"sales": "Please provide path" ,"status": 404});
  }
};

exports.get_sale_filters = function(ids, req, callback) {
  if (ids.length > 0) {
    var a_hash = {};
    var sql = "select product_type,gender,delivery_type from search_sales where sale_id IN (?)"
    var inserts = [ids];
    sql = mysql.format(sql, inserts);
    Common.execute_query(req, sql, function(results) {
      if(results["data"] != undefined) {
        results["data"].forEach( function(arrayItem) {
          for (var key in arrayItem) {
            var key_str = key;
            if (a_hash[key_str] != undefined) {
              if (a_hash[key_str].indexOf(arrayItem[key]) ==  -1) {
                a_hash[key_str].push(arrayItem[key])
              }
            }
            else {
              a_hash[key_str] = []
              a_hash[key_str].push(arrayItem[key])
            }
          };
        });
        return callback({ "filters": a_hash ,"status": 200 });
      }
      else {
        return callback({"Error": results["error"], "status": results["status"]});
      }
    });
  }
  else {
    return callback({"filters": "Please provide valid ids" ,"status": 404});
  }
};


exports.get_filtered_sales = function(ids, req, callback) {
  if(ids.length > 0) {
    value_hash =[]
    var count =0
    //Sql total products after pagination
    var sql = "select distinct sale_id from search_sales"
    sql = sql + " where"
    for (var key in req.param('options')) {
      value_hash.push(req.param('options')[key])
      sql = sql +" "+ key +" IN (?) and"
    }
    sql = sql + " 1=1 and sale_id IN (?) LIMIT ? OFFSET ?"
    var inserts = value_hash.concat.apply(value_hash,[[ids], parseInt(req.param.per_page), parseInt(req.param.page)]);
    sql = mysql.format(sql, inserts);

    //Sql to count the total products for pagination
    var sql_count = "select count(distinct sale_id) as count from search_sales"
    sql_count = sql_count + " where"
    for (var key in req.param('options')) {
      sql_count = sql_count +" "+ key +" IN (?) and"
    }
    sql_count = sql_count + " 1=1 and sale_id IN (?)"
    var inserts = value_hash.concat.apply(value_hash, [[ids]]);
    sql_count = mysql.format(sql_count, inserts);

    Common.execute_query(req, sql, function(results) {
      if(results["data"] != undefined) {
        sales = results["data"];
        Common.execute_query(req, sql_count, function(results) {
          count = results["data"][0]["count"];
          return callback({"sales": sales, "status": 200, "count": count});
        });
      }
      else {
        return callback({"Error": results["error"], "status": results["status"]});
      }
    });
  }
  else {
    return callback({"sales": "Please provide valid ids" ,"status": 404});
  }
};
