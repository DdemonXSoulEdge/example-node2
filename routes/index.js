var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VERSION BLUE - Deploy Automatico' });
});

module.exports = router;
