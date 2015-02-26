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

router.get('/tags', function(req, res, next) {
	var models = require('../models/');
	var tags = []
	var docs = models.Page.find(function(err, data) {
		for (doc in data) {
			tags = tags.concat(data[doc].tags)
			console.log(tags)
		}
		res.render('tagsearch', {tags: tags})
	}); 
})

router.get('/:tag', function(req, res, next) {
	var models = require('../models/')
	var tag = req.params.tag
	var docs = models.Page.find({
		tags: {$elemMatch: {$in: [tag]}}
	}, function(err, data) {
		res.render('pagesbytag', {pages: data})
	})
}) // WORKING ON THIS RIGHT NOW ***

router.get('/wiki/:urlname', function(req, res, next) {
	var models = require('../models/');
	var urlname = req.params.urlname;
	var docs = models.Page.find(function(err, data) {
		for (doc in data) {
			var tags = '#' + data[doc].tags.join([separator = ' #']);
			if (data[doc].url_name == urlname) {
				res.render('show', { title: data[doc].title, body: data[doc].body, tags: tags });
			}
		}
	}); 
});

module.exports = router;
