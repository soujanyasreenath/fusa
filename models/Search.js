var request = require("request");
var mysql = require('mysql');
exports.get_search = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      res.statusCode = 503;
      res.send({
        result: 'error',
        err: err.code
      });
    } else {
      if(req.param('keywords')!=undefined){
        var sql = "select product_id from s_products";
        sql = sql + " where name LIKE ?"
        sql = sql + " or description LIKE ?"
        sql = sql + " or color LIKE ?"
        sql = sql + " or product_type LIKE ?;"
        var inserts = ['%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%'];
        sql = mysql.format(sql, inserts);
        connection.query(sql,function(err,rows)     {
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"products": rows ,"status":200});
          }
        });
      }
      else {
        return callback({"products": "Please provide keywords" ,"status":404});
      }
    }
  });
};

exports.get_filters = function(ids,req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      res.statusCode = 503;
      res.send({
        result: 'error',
        err: err.code
      });
    } else {
      if(ids.length > 0){
        var sql = "select color,product_type,dimension,dmrp as price from s_products where product_id IN (?)"
        var inserts = [ids];
        sql = mysql.format(sql, inserts);
        connection.query(sql,function(err,rows){
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"filters": rows ,"status":200});
          }
        });
      }
      else {
        return callback({"filters": "Please provide valid ids" ,"status":404});
      }
    }
  });
}


exports.get_filtered_products = function(ids,req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      res.statusCode = 503;
      res.send({
        result: 'error',
        err: err.code
      });
    } else {
      if(ids.length > 0){
        value_hash =[]
        var new_hash = JSON.parse(JSON.stringify(req.param('options')));
        var options_params = delete_hash(req.param('options'));
        var sql = "select product_id from s_products"
        sql = sql + " where"
        if (new_hash["price"])
        {
          sql = sql + " dmrp between ? and ? and"
        }
        for (var key in options_params) {
          value_hash.push(options_params[key])
          sql = sql +" "+ key +" IN ? and"
        }
        sql = sql + " 1=1 and product_id IN (?)"
        var inserts = [new_hash["price"]["min"],new_hash["price"]["max"],value_hash,ids];
        sql = mysql.format(sql, inserts);
        connection.query(sql,function(err,rows){
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"products": rows ,"status":200});
          }
        });
      }
      else {
        return callback({"products": "Please provide valid ids" ,"status":404});
      }
    }
  });
}


function delete_hash(options_params)
{
  var x = options_params
  delete options_params["price"]
  return x
}
