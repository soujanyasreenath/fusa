var request = require("request");
var mysql = require('mysql');
exports.get_all_products = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      res.statusCode = 503;
      res.send({
        result: 'error',
        err: err.code
      });
    } else {
      if(req.param('path')!=undefined){
        var count =0
        var sql = "select distinct product_id from search_products";
        sql = sql + " where path = ?"
        if (req.param.page!=undefined && req.param.per_page!=undefined){
          sql = sql + " LIMIT ? OFFSET ? "
        }
        var inserts = [req.param('path'),parseInt(req.param.per_page),parseInt(req.param.page)];
        sql = mysql.format(sql, inserts);

        var sql_count = "select count(distinct product_id) as count from search_products";
        sql_count = sql_count + " where path = ?"
        var sql_inserts = [req.param('path')];
        sql_count = mysql.format(sql_count, sql_inserts);
        connection.query(sql_count,function(err,rows){
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
        return callback({"products": "Please provide path" ,"status":404});
      }
    }
  });
};


