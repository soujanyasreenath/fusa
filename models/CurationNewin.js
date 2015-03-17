var request = require("request");
var mysql = require('mysql');
exports.get_all_curated_newin_sales = function(req, callback) {
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

      if (req.param("tag_id") == undefined) {
        return callback({"data": "Invalid tag_id", "status": 500});
      }

      tag_id = req.param("tag_id")
      inserts = [tag_id]
      sql = "select sale_id,sale_position from curation_newin where tag_id = ? and tag_position is null"
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

exports.get_all_curated_newin_tags= function(req, callback) {
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
      //tag_id = req.param("tag_id")
      inserts = []
      sql = "select tag_id,tag_position from curation_newin where sale_id is null and sale_position is null"
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
            data[element["tag_id"]] = element["tag_position"];
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
      console.log(req.body.data);
      if (req.body.data.tag_id == undefined) {
        return callback({"data": "Invalid tag_id", "status": 500});
      }

      sql = 'insert into curation_newin (tag_id, sale_id, sale_position, tag_position) values (?,?,?,?)'
      inserts = [req.body.data.tag_id, req.body.data.sale_id, req.body.data.sale_position, req.body.data.tag_position]
      sql = mysql.format(sql, inserts);

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

      console.log(req.body);
      if (req.body.tag_id != undefined) {

        for (var key in req.body.data) {

          sql = "update curation_newin set sale_position = ? where tag_id = ? and sale_id = ?"
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
      } 
      else if (req.body.tag_id == undefined) {
        
        for (var key in req.body.data) {

          sql = "update curation_newin set tag_position = ? where tag_id = ? and sale_id is null"
          inserts = [req.body.data[key], key]
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

      if (req.body.data.sale_id == undefined) {
        sql = 'delete from curation_newin where tag_id = ? and sale_id is null' 
        inserts = [req.body.data.tag_id] 
      } else {
        sql = 'delete from curation_newin where tag_id = ? and sale_id = ?'
        inserts = [req.body.data.tag_id,req.body.data.sale_id] 
      }

      sql = mysql.format(sql, inserts);
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