var request = require("request");
var mysql = require('mysql');
var Common = require("../models/Common");

/* 
  Finction: get_all_curated_data
  Inputs: tabl_name
  table_nmae: is the name of the table from which all the data will be fetched.
*/

exports.get_all_curated_data = function(req, table_name, callback) {
  var sql = "select * from " + table_name;
  var inserts = ''
  sql = mysql.format(sql, inserts);
  Common.execute_query(req, sql, function(results) {
    if(results["data"] != undefined) {
      curated_tags = results["data"];
      return callback({"data": curated_tags, "status": 200});
    }
    else {
      return callback({"Error": results["error"], "status": results["status"]});
    }
  });
};


/* Function create: Handles all the insertions to the database
  Inputs: req, table_name
  req (Request params): req.body contains the data to be inserted. 

    sample input json:
    {
      "data": [
        {
          "tag_id": 3,
          "tag_position": 3
        },
        {
          "tag_id": 4,
          "tag_position": 4
        }
      ]
    }
  table_nmae: is the name of the table to which the values should be inserted
  PS: Do not allow multiple statement execution for node-mysql as it can infuse issue of sql injection.
*/

exports.create = function(req, table_name, callback) {
  Common.destroy_all(req, table_name, function(results) {
    if (results.data == "Success") {
      var columns = '';
      var sql = '';
      var values = [];
      // Parse the values of the request data to insert sql format.
      // Collects all the values tobe inserted

      if (Array.isArray(req.body.data) == true && req.body.data.length > 0) {
        columns = Object.keys(req.body.data[0]); //Get the column names
        sql = "insert into " + table_name + " (" + columns + ") values ?"; // TODO: Rework?
        req.body.data.forEach( function(element) {
          values.push(Object.keys(element).map(function(key) {
            return element[key]
          })); 
        });
        if (values.length <= 0) {
          return callback({"Error": "Received an empty data set.", "status": 500});
        }
      }
      else {
        return callback({"Error": "Received an empty data set or Data received is not an Array.", "status": 500});
      }

      // Sending sql and values for mysql
      // Sql is executed in Common Lib js

      sql = mysql.format(sql, [values]);
      Common.execute_query(req, sql, function(results) {
        if(results["data"] != undefined) {
          curated_tags = results["data"];
          return callback({"data": curated_tags, "status": 200});
        }
        else {
          return callback({"Error": results["error"], "status": results["status"]});
        }
      });
    }
    else {
      return callback({"Error": results["error"], "status": results["status"]});
    }
  });
};

