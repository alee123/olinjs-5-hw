
/*
 * GET users listing.
 */
 var User = require('../models/user')

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.do = function (req, res) {
  req.facebook.api('/me', function(err, general) {
	req.facebook.api('/me/picture?redirect=false&type=large', function(err, picture) {
//    console.log("user",data);
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    	res.send(data);
      console.log("reset");
      var user = User.find({name:general.name}).exec(function (err, docs) {
        if (err)
          return console.log("error", ingredients);
          // send it back
        if (docs[0] == null) {
          var newUser = new User({name:general.name, url: picture.data.url, bg:'#660066', font:'#FFFFFF', border:'#FFFFFF', quote:'PUT SOMETHING HERE'});
        }
        else {
          var newUser = docs[0];
        }

        User.remove({name:general.name},1);

        req.session.user = newUser;
        console.log(newUser);
        res.render('index', {title:"Welcome to shitty facebook", currentUser: newUser});
      });    	

	});
  });
};

exports.buttonPush = function (req, res) {
  var id = req.session.user.name;
  var userSess = req.session.user;

  var newUser = new User({name:userSess.name, url: userSess.url, bg: req.body.bg, font:req.body.font, border:req.body.border, quote: req.body.quote})
  var user = User.find({name:userSess.name}).exec(function (err,docs){
    var newUser = new User({name:userSess.name, url: userSess.url, bg: req.body.bg, font:req.body.font, border:req.body.border, quote: req.body.quote})
    if(docs[0] !=null){
      User.remove({name:general.name},1);
    }
    newUser.save( function(err){
      if (err)
        return console.log(err);    
    });
  })


  req.session.user = newUser;
  console.log(req.session.user);
}

exports.logout = function(req,res){
  console.log('loggingout');
  // var newUser = new User(req.session.user);
  // newUser.save( function(err){
  //   if (err)
  //     return console.log(err);    
  // });
  req.user = null;
  req.session.destroy();
  res.redirect('/');
//  res.send('You have been logged out. GOODBYE!');
};