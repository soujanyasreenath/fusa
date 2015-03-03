var request = require("request");
exports.get_search_filters = function(req, callback) {
  req.getConnection(function(err, connection) {
    if (err) {
      console.error('CONNECTION error: ',err);
      res.statusCode = 503;
      res.send({
        result: 'error',
        err: err.code
      });
    } else {
      connection.query('SELECT * FROM s_products',function(err,rows)     {
        if(err){
          console.log("Error Selecting : %s ",err );
        }
        else{
          return callback({"products": rows ,"status":200});
        }
      });
    }
  });
};
