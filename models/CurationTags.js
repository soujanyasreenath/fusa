var request = require("request");
var mysql = require('mysql');

exports.get_all_curated_tags = function(req, callback) {
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
      parent_tag_id = req.param("parent_tag_id")
      inserts = [parent_tag_id]
      sql = "select tag_id, tag_position from curation_tags where parent_tag_id = ?"
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
      
      if (req.body.data.tag_id == undefined) {
        return callback({"data": "Invalid tag_id", "status": 500});
      }
      

      sql = 'insert into curation_tags (tag_id, parent_tag_id, tag_position) values (?, ?, ?)'
      inserts = [req.body.data.tag_id,req.body.data.parent_tag_id, req.body.data.tag_position]
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

      if (req.body.parent_tag_id != 0) {
        for (var key in req.body.data) {

          sql = "update curation_tags set tag_position = ? where parent_tag_id = ? and tag_id = ?"
          inserts = [req.body.data[key], req.body.parent_tag_id, key]
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
      else if (req.body.parent_tag_id == 0) {
        for (var key in req.body.data) {

          sql = "update curation_tags set tag_position = ? where tag_id = ? and parent_tag_id = 0"
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

      console.log(req.body.data);

      if (req.body.data.parent_tag_id == 0) {
        sql = 'delete from curation_tags where tag_id = ? and parent_tag_id = 0' 
        inserts = [req.body.data.tag_id] 
      } else {
        sql = 'delete from curation_tags where tag_id = ? and parent_tag_id = ?' 
        inserts = [req.body.data.tag_id,req.body.data.parent_tag_id] 
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