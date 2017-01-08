var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var path = require('path');
var UserHandler = require('../db_handlers/user_handler');

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "/" + month + "/" + day + "|" + hour + ":" + min + ":" + sec;

}

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects

    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.status(403).json({
        err: "Forbidden!!"
    });
}

var isAdmin = function (req, res, next) {
    if (req.user.type == 1) {
        return next();
    }
    res.status(403).json({
        err: "Forbidden!!"
    });
}

// strips everything except username and type from user (dont want to send hash to client)
var stripUser = function (user) {
    var strippedUser = {};
    strippedUser.username = user.username;
    strippedUser.type = user.type;
    strippedUser.projects = user.projects;
    return strippedUser;
}


module.exports = function (passport) {


    /* GET login page. */
    router.get('/', function (req, res) {
        // Display the Login page with any flash message, if any
        //console.log("get /", __dirname);
        //res.status(200).send("5456465");
        res.sendFile(path.join(__dirname, '../views', 'index.html'));
        //res.render('index.ejs');
    });


    router.post('/login', function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                console.log("Stripped user");
                console.log(stripUser(user));
                res.status(200).json({
                    status: stripUser(user)
                });
                //console.log("LOGIN _______");
                //console.log(user);
            });
        })(req, res, next);
    });


    router.post('/register', function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: 'User already exists?'
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                res.status(200).json({
                    status: 'Login scuccessful!'
                });
            });


        })(req, res, next);
    });

// router.post('/register', function(req, res, next) {
//   console.log("Ssssss");
//   passport.authenticate('signup', function(err, user, info) {
//     console.log("MARS");
//   })
// })

// router.post('/register', passport.authenticate('signup', {
//   successRedirect: '/',
//   failureRedirect: '/register',
//   failureFlash : true  
// }));


    /* Handle Logout */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// send user status, false if not logged in, object of user if logged in
    router.get('/status', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        // console.log("req.user ===============");
        // console.log(req.user.type);
        res.status(200).json({
            status: stripUser(req.user)
        });
    });

    return router;
}





