var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

/* GET home page. */
router.get('/api/get_search_filters', function(req,res) {
  searchController.get_search_filters(req,res);
});

module.exports = router;
