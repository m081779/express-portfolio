var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	console.log('firing')
	res.render('index', { title: 'Marcoprincipio.com' });
});


module.exports = router;
