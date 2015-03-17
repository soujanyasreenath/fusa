var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');
var saleFilterController = require('../controllers/saleFilterController');
var productFilterController = require('../controllers/productFilterController');
var curationNewinController = require('../controllers/curationNewinController');
var curationFeaturedSaleController = require('../controllers/curationFeaturedSaleController');
var curationTagsController = require('../controllers/curationTagsController');

/* Routes for Search and Filters. */
router.get('/api/populate_filters', function(req, res) {
  searchController.populate_filters(req, res);
});

router.post('/api/get_filtered_search_products', function(req, res) {
  searchController.get_filtered_search_products(req, res);
});

router.get('/api/populate_sale_filters', function(req, res) {
  saleFilterController.populate_sale_filters(req, res);
});

router.post('/api/get_filtered_sales', function(req, res) {
  saleFilterController.get_filtered_sales(req, res);
});

router.get('/api/populate_product_filters', function(req, res) {
  productFilterController.populate_product_filters(req, res);
});

router.post('/api/get_filtered_products', function(req, res) {
  productFilterController.get_filtered_products(req, res);
});


/* Routes Curation Data */
/* Routes for Newin */

router.get('/api/get_all_curated_newin_tags', function(req, res) {
  curationNewinController.index_tags(req, res);
});

router.get('/api/get_all_curated_newin_sales', function(req, res) {
  curationNewinController.index_sales(req, res);
});

router.post('/api/insert_newin_curation', function(req, res) {
  curationNewinController.create(req, res);
});

router.post('/api/update_newin_curation', function(req, res) {
  curationNewinController.update(req, res);
});

router.post('/api/delete_newin_curation', function(req, res) {
  curationNewinController.delete(req, res);
});

/* Routes for FeaturedSale */

router.get('/api/get_all_curated_featured_sale', function(req, res) {
  curationFeaturedSaleController.index(req, res);
});

router.post('/api/insert_featured_sale_curation', function(req, res) {
  curationFeaturedSaleController.create(req, res);
});

router.post('/api/update_featured_sale_curation', function(req, res) {
  curationFeaturedSaleController.update(req, res);
});

router.post('/api/delete_featured_sale_curation', function(req, res) {
  curationFeaturedSaleController.delete(req, res);
});

/* Routes for Curation Tags */

router.get('/api/get_all_curated_tags', function(req, res) {
  curationTagsController.index(req, res);
});

router.post('/api/insert_tags_curation', function(req, res) {
  curationTagsController.create(req, res);
});

router.post('/api/update_tags_curation', function(req, res) {
  curationTagsController.update(req, res);
});

router.post('/api/delete_tags_curation', function(req, res) {
  curationTagsController.delete(req, res);
});

module.exports = router;
