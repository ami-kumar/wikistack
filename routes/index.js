var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var models = require('../models/');
	var docs = models.Page.find(function(err, data) {
		res.render('index', { title: 'Express', docs: data });
	});
});

router.get('/add', function(req, res, next) {
	res.render('add', { title: 'ADD A PAGE' })
});

router.get('/wiki/:urlname', function(req, res, next) {
	var models = require('../models/');
	var urlname = req.params.urlname;
	// var tags = data[doc]
	var docs = models.Page.find(function(err, data) {
		for (doc in data) {
			if (data[doc].url_name == urlname) {
				res.render('show', { title: data[doc].title, body: data[doc].body, tags: data[doc].tags });
			}
		}
	}); 
});

module.exports = router;
