var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addpage', function(req, res, next) {
	res.render('addpage', { title: 'ADD A PAGE' })
})

module.exports = router;
