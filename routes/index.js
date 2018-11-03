var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function(req, res) {
	let projects = JSON.parse(fs.readFileSync('./data/projects.js', 'utf8'));
	res.render('index', { title: 'MarcoPrincipio.com', projects: projects });
});


module.exports = router;
