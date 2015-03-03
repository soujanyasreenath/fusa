var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

/* GET home page. */
router.get('/api/get_search_filters', function(req,res) {
  searchController.get_search_filters(req,res);
});

router.post('/api/get_filtered_products', function(req,res) {
  searchController.get_filtered_products(req,res);
});

module.exports = router;
