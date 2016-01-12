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

router.post('/addinfo', function(req, res){

  // Set our internal DB variable
  var db = req.db;

  var userName = req.body.username;
  var food     = req.body.food;

  var collection = db.get('userinfo');

  //Submit to the DB
  collection.insert({
    "username" : userName,
    "food"     : food
  }, function(err, doc) {
    if (err) {
      //If it failed, return error
      res.send("There was a problem adding the information to the database");
    } else {
      // Forward to success page
      res.redirect('/mongoinfo');
    }
  });
});

router.get('/mongoinfo', function(req, res) {
  var db = req.db;
  var collection = db.get('userinfo');
  collection.find({}, {}, function(e, docs){
    res.render('mongoinfo', {
      "mongoinfo": docs
    });
  });
});

router.get('/foods', function(req, res){
  res.render('foods.jade');
});

module.exports = router;
