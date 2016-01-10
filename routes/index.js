var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/results', function(req, res){
  var name = req.query.name;
  var food = req.query.food;
  var stringToWrite = "li " + name + ": " + food + "\n";
  fs.appendFile('./views/foods.jade', stringToWrite, function(){});
  //var write = fs.createWriteStream('./views/foods.jade');
  console.log(name);
  console.log(food);

});

router.get('/foods', function(req, res){
  res.render('foods.jade');
});

module.exports = router;
