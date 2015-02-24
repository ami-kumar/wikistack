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
})

module.exports = router;
