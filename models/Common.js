var mysql = require('mysql');

exports.fetch_ids = function(data, val) {
  var ids = [];
  for(var key in data) {
    ids.push(data[key][val+"_id"]);
  }
  return ids;
}

exports.paginate = function(record_count, current_page, page_size) {
  total_pages = Math.ceil(record_count / page_size);
  last_page = parseInt(total_pages);
  current_page = parseInt(current_page) + 1 > parseInt(last_page) ? parseInt(last_page) : parseInt(current_page) + 1;
  prev_page = parseInt(current_page) == 1 ? null : parseInt(current_page) - 1;
  next_page = parseInt(current_page) == parseInt(last_page) ? null : parseInt(current_page) + 1;
  page = { "total_pages": total_pages, "last_page": last_page, "prev_page": prev_page, "next_page": next_page, "current_page": current_page }
  return page
}

exports.compute_offset = function(page) {
  return parseInt(page) == 1 ? 0 : 24 * (page - 1);
}

exports.execute_query = function(req, sql_query, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ', err);
      return callback({"error": err, "status": 500});
    }
    else {
      connection.query(sql_query, function(err, rows) {
        if(err) {
          console.log("Error Selecting : %s ", err);
          return callback({"error": err, "status": 500});
        }
        else {
           return callback({"data": rows, "status": 200});
        }
      });
    }
  });
}


exports.destroy_all = function(req,table, callback) {
  var sql = "truncate " + table;
  var inserts = []
  sql = mysql.format(sql, inserts);
  exports.execute_query(req, sql, function(results) {
    if(results["data"] != undefined) {
      return callback({"data": "Success", "status": 200});
    }
    else {
      return callback({"Error": results["error"], "status": results["status"]});
    }
  });
};