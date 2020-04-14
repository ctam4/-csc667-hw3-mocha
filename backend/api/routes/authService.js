const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session'); 


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(upload.array());
router.use(session({secret: "Your secret key"}));

var Users = [];

router.post('/auth/create', function(req, res){
   if(!req.body.email || !req.body.password){
      res.status("400");
      res.send("Invalid information!");
   } else {
      Users.filter(function(user){
         if(user.email === req.body.email){
           message= "User already exists! try use different email";
           res.send(message);
         }
      });
      
      var newUser = {firstname: req.body.firstname, lastname: req.body.lastname, 
                     email: req.body.email, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
     
   }
});

function checkSignIn(req, res){
   if(req.session.user){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}


router.post('/auth/authenticate', checkSignIn, function(req, res){
   console.log(Users);
   if(!req.body.email || !req.body.password){
      message= "Please enter both id and password";
      res.send(message);
   } else {
      Users.filter(function(user){
         if(user.email === req.body.email && user.password === req.body.password){
            req.session.user = user;
            message="log in information match";
            res.send(message);
         }
      });
      message= "Invalid credentials!";
      res.send(message);
   }
});

router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
  
});

module.exports = router;