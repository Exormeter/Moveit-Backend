import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import errorHandler = require('errorhandler');
import methodOverride = require('method-override');

var session = require('express-session');

import mongoose = require("mongoose"); //import mongoose

//routes
import { IndexRoute } from "./routes/indexRoute";
import { newUserRoute } from "./routes/newUserRoute";
import { loginRoute} from "./routes/loginRoute";
//interfaces
// import * as User from './models/user';      // import User
// import * as Event from './models/event';    // import Event


export class Server {

    public app: express.Application;


    public static bootstrap(): Server {
        return new Server();
    }


    constructor() {

        this.app = express();

        this.config();

        this.routes();

        this.api();
    }


    public api() {

    }


    public config() {
        const MONGODB_CONNECTION: string = "mongodb://Exormeter:12warhawk34@ds155509.mlab.com:55509/heroku_xb65vxl6"

        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        //mount logger
        this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parker
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //mount override
        this.app.use(methodOverride());

        //Session Management
        this.app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));

        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;

        //connect to mongoose
        mongoose.connect(MONGODB_CONNECTION);
        mongoose.connection.on("connected", () => {
            console.log("Connected to database " + MONGODB_CONNECTION);
        });


        // catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }


    private routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);
        //newUserRoute
        newUserRoute.create(router);

        //LoginRoute
        loginRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
}