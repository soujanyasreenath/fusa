var request = require("request");
var mysql = require('mysql');
exports.get_all_curated_featured_sales = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      sql = "select * from curation_featured_sale"
      connection.query(sql,function(err,rows){
        if(err){
          console.log("Error Selecting : %s ",err );
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          return callback({"data": rows ,"status":200});
        }
      });
    }
  });
};

exports.create = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      
      if (req.body.data.tag_id == undefined)
      {
        return callback({"data": "Invalid tag_id" ,"status":500});
      }
      else if(req.body.data.sale_id == undefined) {
        return callback({"data": "Invalid sale_id" ,"status":500});
      }

      sql = 'insert into curation_featured_sale (tag_id, sale_id, sale_position) values ("' + req.body.data.tag_id + '", "' + req.body.data.sale_id + '", "' + req.body.data.sale_position + '")'
      connection.query(sql,function(err,rows){
        if(err){
          console.log("Error Selecting : %s ",err );
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          return callback({"data": rows ,"status":200});
        }
      });
    }
  });
};

exports.update = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {
      var set_str = ''
      if(req.body.data.sale_position != undefined) {
        set_str = "set sale_position = " + req.body.data.sale_position
      }
      else {
        return callback({"data": "Nothing to Update" ,"status":500});
      }

      if (req.body.data.tag_id == undefined)
      {
        return callback({"data": "Invalid tag_id" ,"status":500});
      }
      else if(req.body.data.sale_id == undefined) {
        return callback({"data": "Invalid sale_id" ,"status":500});
      }

      sql = "update curation_featured_sale " + set_str + ' where tag_id = "' + req.body.data.tag_id + '" and sale_id = "' + req.body.data.sale_id + '"'
      console.log(sql);
      connection.query(sql,function(err,rows){
        if(err){
          console.log("Error Selecting : %s ",err );
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          return callback({"data": rows ,"status":200});
        }
      });  
    }
  });
};

exports.delete = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      callback.statusCode = 503;
      return callback({
        result: 'Mysql Connection Error.',
        err: err.code
      });
    } 
    else {

      if (req.body.data.tag_id == undefined)
      {
        return callback({"data": "Invalid tag_id" ,"status":500});
      }
      else if(req.body.data.sale_id == undefined) {
        return callback({"data": "Invalid sale_id" ,"status":500});
      }

      sql = 'delete from curation_featured_sale where tag_id = "' + req.body.data.tag_id + '" and sale_id = "' + req.body.data.sale_id + '"'
      connection.query(sql,function(err,rows){
        if(err){
          console.log("Error Selecting : %s ",err );
          return callback({
            "error": err,
            "status":500
          });
        }
        else {
          return callback({"data": rows ,"status":200});
        }
      });
    }
  });
};

