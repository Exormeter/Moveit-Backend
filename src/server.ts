import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
var express = require('express');
var app = express();
import * as logger from 'morgan';
import * as path from 'path';

import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

import mongoose = require("mongoose"); //import mongoose

//routes
import { IndexRoute } from "./routes/indexRoute";
// import { newUserRoute } from "./routes/newUserRoute";
import { LoginRoute } from "./routes/loginRoute";
import { SignupRoute } from "./routes/signupRoute";
import { HomeRoute } from "./routes/homeRoute";
import { NewEventRoute } from "./routes/newEventRoute";
import { MyEventsRoute } from "./routes/myEventsRoute";
import { MyEventsSubscriberRoute } from "./routes/myEventsSubscriberRoute";
import { AllUsersRoute } from "./routes/allUsersRoute";
import { LogoutRoute } from "./routes/logoutRoute";
//interfaces
import * as User from './models/user';      // import User
// import * as Event from './models/event';    // import Event

// Configuring Passport
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var flash = require('connect-flash');

// Use cors
var cors = require('cors');

export class Server {

    public app = app;

    public static bootstrap(): Server {
        return new Server();
    }


    constructor() {


        this.config();

        this.routes();

        this.api();
    }


    public api() {

    }


    public config() {
        const MONGODB_CONNECTION: string = "mongodb://Exormeter:12warhawk34@ds155509.mlab.com:55509/heroku_xb65vxl6"

        //add static paths
        app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "pug");

        //mount logger
        app.use(logger("dev"));

        //mount json form parser
        app.use(bodyParser.json());

        //mount query string parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parker
        app.use(cookieParser("SECRET_GOES_HERE"));

        //mount override
        app.use(methodOverride());


        //Session Management
        //Configuring Passport
        app.use(expressSession({ secret: 'mySecretKey' }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });
        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

        // LOGIN
        passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {
                // check in mongo if a user with username exists or not
                User.findOne({ 'username': username },
                    function (err, user) {
                        // In case of any error, return using the done method
                        if (err)
                            return done(err);
                        // Username does not exist, log error & redirect back
                        if (!user) {
                            console.log('User Not Found with username ' + username);
                            return done(null, false,
                                req.flash('message', 'User Not found.'));
                        }
                        // User exists but wrong password, log the error 
                        // if (!isValidPassword(user, password)) {
                        if (user.password !== password) { // !!! !!! !!!
                            console.log('Invalid Password');
                            return done(null, false,
                                req.flash('message', 'Invalid Password'));
                        }
                        // User and password both match, return user from 
                        // done method which will be treated like success
                        return done(null, user);
                    }
                );
            })
        );

        // SIGNUP
        passport.use('signup', new LocalStrategy({
            passReqToCallback: true
        },
            function (req, username, password, done) {
                // find a user in Mongo with provided username
                User.findOne({ 'username': username }, function (err, user) {
                    // In case of any error return
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists');
                        return done(null, false,
                            req.flash('message', 'User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.username = username;
                        // newUser.password = createHash(password);
                        newUser.password = password; // !!! !!! !!!
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');
                        newUser.birthdate = req.param('birthdate');
                        newUser.sex = req.param('sex');
                        newUser.picture = req.param('picture');

                        // save the user
                        newUser.save(function (err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            })
        );


        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;

        //connect to mongoose
        mongoose.connect(MONGODB_CONNECTION);
        mongoose.connection.on("connected", () => {
            console.log("Connected to database " + MONGODB_CONNECTION);
        });

        // Use cors
        app.options('*', cors());
        app.use(cors());

        // catch 404 and forward to error handler
        app.use(function (err: any, req, res, next) {
            // err.status = 404;
            next(err);
        });

        //error handling
        app.use(errorHandler());
    }


    private routes() {
        var router = express.Router();

        // route middleware that will happen on every request
        router.use(function (req, res, next) {

            // log each request to the console
            console.log(req.method, req.url);

            // continue doing what we were doing and go to the route
            next();
        });

        //IndexRoute
        IndexRoute.create(router);
        //newUserRoute
        // newUserRoute.create(router);
        //LoginRoute
        LoginRoute.create(router);
        //SignupRoute
        SignupRoute.create(router);
        //HomeRoute
        HomeRoute.create(router);
        //NewEventRoute
        NewEventRoute.create(router);
        //MyEventsRoute
        MyEventsRoute.create(router);
        //MyEventsSubscriberRoute
        MyEventsSubscriberRoute.create(router);
        //AllUsersRoute
        AllUsersRoute.create(router);
        //LogoutRoute
        LogoutRoute.create(router);

        //use router middleware
        app.use(router);
    }
}