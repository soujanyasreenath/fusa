var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');
var saleFilterController = require('../controllers/saleFilterController');
var productFilterController = require('../controllers/productFilterController');

/* GET home page. */
router.get('/api/get_search_filters', function(req,res) {
  searchController.get_search_filters(req,res);
});

router.post('/api/get_filtered_search_products', function(req,res) {
  searchController.get_filtered_search_products(req,res);
});

router.get('/api/get_sale_filters', function(req,res) {
  saleFilterController.get_sale_filters(req,res);
});

router.post('/api/get_filtered_sales', function(req,res) {
  saleFilterController.get_filtered_sales(req,res);
});

router.get('/api/get_product_filters', function(req,res) {
  productFilterController.get_product_filters(req,res);
});

router.post('/api/get_filtered_products', function(req,res) {
  productFilterController.get_filtered_products(req,res);
});

module.exports = router;
