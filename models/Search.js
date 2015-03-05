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
        var count =0
        var sql = "select distinct product_id from search_products";
        sql = sql + " where name LIKE ?"
        sql = sql + " or description LIKE ?"
        sql = sql + " or color LIKE ?"
        sql = sql + " or product_type LIKE ?"
        if (req.param.page!=undefined && req.param.per_page!=undefined){
          sql = sql + " LIMIT ? OFFSET ? "
        }
        var inserts = ['%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%',parseInt(req.param.per_page),parseInt(req.param.page)];
        sql = mysql.format(sql, inserts);
        var sql_count = "select count(distinct product_id) as count from search_products";
        sql_count = sql_count + " where name LIKE ?"
        sql_count = sql_count + " or description LIKE ?"
        sql_count = sql_count + " or color LIKE ?"
        sql_count = sql_count + " or product_type LIKE ?"
        var sql_inserts = ['%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%', '%'+req.param('keywords')+'%'];
        sql_count = mysql.format(sql_count, sql_inserts);
        connection.query(sql_count,function(err,rows)     {
          count = rows[0]["count"];
        });
        connection.query(sql,function(err,rows)     {
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"products": rows ,"status":200,"count" : count});
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
        var a_hash = {};
        var sql = "select color,product_type,dimension,price,gender,delivery_type from search_products where product_id IN (?)"
        var inserts = [ids];
        sql = mysql.format(sql, inserts);
        connection.query(sql,function(err,rows){
          rows.forEach( function (arrayItem)
			{
			  for (var key in arrayItem) {
			    var key_str = key;
			    if (a_hash[key_str] != undefined){
			      if (a_hash[key_str].indexOf(arrayItem[key]) ==  -1){
				a_hash[key_str].push(arrayItem[key])
			      }
			    }
			    else{
			      a_hash[key_str] = []
			      a_hash[key_str].push(arrayItem[key])
			    }
			  };
			});
          a_hash["price"] = a_hash["price"].sort(function(a,b){return a-b});
          a_hash["price"] = [Math.min.apply(Math,a_hash["price"]),Math.max.apply(Math,a_hash["price"])]
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"filters": a_hash ,"status":200});
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
        var count =0
        var new_hash = JSON.parse(JSON.stringify(req.param('options')));
        var options_params = delete_hash(req.param('options'));
        //Sql total products after pagination
        var sql = "select distinct product_id from search_products"
        sql = sql + " where"
        for (var key in options_params) {
          value_hash.push(options_params[key])
          sql = sql +" "+ key +" IN (?) and"
        }
        if (new_hash["price"])
        {
          sql = sql + " price between ? and ? and"
        }
        sql = sql + " 1=1 and product_id IN (?) LIMIT ? OFFSET ?"
        var inserts = value_hash.concat.apply(value_hash,[new_hash["price"]["min"],new_hash["price"]["max"],[ids],parseInt(req.param.per_page),parseInt(req.param.page)]);
        sql = mysql.format(sql, inserts);
        //Sql to count the total products for pagination
        var sql_count = "select count(distinct product_id) as count from search_products"
        sql_count = sql_count + " where"
        for (var key in options_params) {
          sql_count = sql_count +" "+ key +" IN (?) and"
        }
        if (new_hash["price"])
        {
          sql_count = sql_count + " price between ? and ? and"
        }
        sql_count = sql_count + " 1=1 and product_id IN (?)"
        var inserts = value_hash.concat.apply(value_hash,[new_hash["price"]["min"],new_hash["price"]["max"],[ids]]);
        sql_count = mysql.format(sql_count, inserts);
        connection.query(sql_count,function(err,rows)     {
          count = rows[0]["count"];
        });
        connection.query(sql,function(err,rows){
          if(err){
            console.log("Error Selecting : %s ",err );
          }
          else {
            return callback({"products": rows ,"status":200,"count" : count});
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
