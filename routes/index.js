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
		// var uniquetags = []; // WORKING ON THIS RIGHT NOW *** jQuery doesn't work
		// $.each(names, function(i, el){
		//     if($.inArray(el, uniquetags) === -1) uniquetags.push(el);
		// });
		// res.render('tagsearch', {tags: uniquetags})
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
}) 

router.get('/similars/:urlname', function(req, res, next) {
	var models = require('../models/');
	var url_name = req.params.urlname
	var tags = []
	var docs = models.Page.find({
		url_name: url_name
	},function(err, data) {
		tags = data[0].tags
		console.log(data[0])
		console.log(tags)

		var docs2 = models.Page.find({
			tags: {$elemMatch: {$in: tags}}
		}, function(err, data) {
			res.render('index', {title: 'Similar Pages', docs: data})
		})

	})

})

router.get('/wiki/:urlname', function(req, res, next) {
	var models = require('../models/');
	var urlname = req.params.urlname;
	var docs = models.Page.find(function(err, data) {
		for (doc in data) {
			var tags = '#' + data[doc].tags.join([separator = ' #']);
			if (data[doc].url_name == urlname) {
				res.render('show', { title: data[doc].title, body: data[doc].body, tags: tags, urlname: data[doc].url_name });
			}
		}
	}); 
});

module.exports = router;
