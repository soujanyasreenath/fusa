var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');
var saleFilterController = require('../controllers/saleFilterController');
var productFilterController = require('../controllers/productFilterController');
var curationNewinController = require('../controllers/curationNewinController');
var curationFeaturedSaleController = require('../controllers/curationFeaturedSaleController');

/* Routes for Search and Filters. */
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


/* Routes for Newin */

router.get('/api/curation_newin_index', function(req,res) {
  curationNewinController.index(req,res);
});

router.post('/api/curation_newin_create', function(req,res) {
  curationNewinController.create(req,res);
});

router.post('/api/curation_newin_update', function(req,res) {
  curationNewinController.update(req,res);
});

router.post('/api/curation_newin_delete', function(req,res) {
  curationNewinController.delete(req,res);
});

/* Routes for FeaturedSale */

router.get('/api/curationFeaturedSale_index', function(req,res) {
  curationFeaturedSaleController.index(req,res);
});

router.post('/api/curationFeaturedSale_create', function(req,res) {
  curationFeaturedSaleController.create(req,res);
});

router.post('/api/curationFeaturedSale_update', function(req,res) {
  curationFeaturedSaleController.update(req,res);
});

router.post('/api/curationFeaturedSale_delete', function(req,res) {
  curationFeaturedSaleController.delete(req,res);
});

module.exports = router;
