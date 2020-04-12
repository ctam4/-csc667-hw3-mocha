const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const redis = require('redis');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const upload = multer();
const session = require('express-session'); 
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];

app.get('/signup', function(req, res){
   res.render('signup');
});

app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid information!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User already exists! try use different id"});
         }
      });
      
      var newUser = {id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, 
                     email: req.body.email, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/notePage');
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
app.get('/notePage', checkSignIn, function(req, res){
   res.render('notePage', {id: req.session.user.id})
});

app.get('/login', function(req, res){
   res.render('login');
});

app.post('/login', function(req, res){
   console.log(Users);
   if(!req.body.id || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
            res.redirect('/notePage');
         }
      });
      res.render('login', {message: "Invalid credentials!"});
   }
});

app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

app.use('/notePage', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

      
app.listen(port, () => console.log(`Example app listening on port ${port}!`));