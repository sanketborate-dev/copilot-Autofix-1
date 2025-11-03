var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("<div onmouseover=\"alert('This is a script injected from an external source.')\">hover here</div>");
});

router.get('/eval', function(req, res, next) {
  res.send("alert('This is a script from an external source run through eval()');");
});

module.exports = router;
