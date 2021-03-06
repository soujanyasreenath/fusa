var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var partials = require('./routes/partials');
var app = express();
var dbOptions = require('./database.json')[app.get('env')];
var mysql = require('mysql'), // node-mysql module
connection = require('express-myconnection'); // express-myconnection module
app.use(connection(mysql, dbOptions, 'single'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/populate_filters', routes);
app.post('/api/get_filtered_search_products', routes);
app.get('/api/populate_sale_filters', routes);
app.post('/api/get_filtered_sales', routes);
app.get('/api/populate_product_filters', routes);
app.post('/api/get_filtered_products', routes);

app.get('/api/get_all_curated_newin_tags', routes);
app.get('/api/get_all_curated_newin_sales', routes);
app.post('/api/insert_newin_curation', routes);
app.post('/api/update_newin_curation', routes);
app.post('/api/delete_newin_curation', routes);


app.get('/api/get_all_curated_featured_sale', routes);
app.post('/api/insert_featured_sale_curation', routes);
app.post('/api/update_featured_sale_curation', routes);
app.post('/api/delete_featured_sale_curation', routes);


app.get('/api/get_all_curated_tags', routes);
app.post('/api/insert_tags_curation', routes);
app.post('/api/update_tags_curation', routes);
app.post('/api/delete_tags_curation', routes);

app.get('/templates/:name', partials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
