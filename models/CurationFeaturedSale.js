var request = require("request");
var mysql = require('mysql');
exports.get_all_curated_featured_sales = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ', err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      tag_id = req.param("tag_id")
      inserts = [tag_id]
      sql = "select sale_id,sale_position from curation_featured_sale where tag_id = ?"
      sql = mysql.format(sql, inserts);

      connection.query(sql, function(err, rows) {
        if (err) {
          console.log("Error Selecting : %s ",err );
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          data = {}
          rows.forEach( function(element) {
            data[element["sale_id"]] = element["sale_position"];
          });

          console.log(data);
          return callback({"data": data, "status": 200});
        }
      });
    }
  });
};

exports.create = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ', err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      
      if (req.body.data.tag_id == undefined) {
        return callback({"data": "Invalid tag_id", "status": 500});
      }
      else if (req.body.data.sale_id == undefined) {
        return callback({"data": "Invalid sale_id", "status": 500});
      }

      sql = 'insert into curation_featured_sale (tag_id, sale_id, sale_position) values ("' + req.body.data.tag_id + '", "' + req.body.data.sale_id + '", "' + req.body.data.sale_position + '")'
      connection.query(sql, function(err, rows) {
        if(err){
          console.log("Error Selecting : %s ", err);
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          return callback({"data": rows, "status": 200});
        }
      });
    }
  });
};

exports.update = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ', err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      for (var key in req.body.data) {

        sql = "update curation_featured_sale set sale_position = ? where tag_id = ? and sale_id = ?"
        inserts = [req.body.data[key], req.body.tag_id, key]
        sql = mysql.format(sql, inserts);

        connection.query(sql, function(err, rows) {
          if (err) {
            console.log("Error Selecting : %s ", err);
            return callback({
              "error": err,
              "status": 500
            });
          }

        }); 
      }
      return callback({"data": "Done", "status": 200}); 
    }
  });
};

exports.delete = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ', err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {

      if (req.body.data.tag_id == undefined) {
        return callback({"data": "Invalid tag_id", "status": 500});
      }
      else if (req.body.data.sale_id == undefined) {
        return callback({"data": "Invalid sale_id", "status": 500});
      }

      sql = 'delete from curation_featured_sale where tag_id = "' + req.body.data.tag_id + '" and sale_id = "' + req.body.data.sale_id + '"'
      connection.query(sql, function(err, rows) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          return callback({
            "error": err,
            "status": 500
          });
        }
        else {
          return callback({"data": rows, "status": 200});
        }
      });
    }
  });
};