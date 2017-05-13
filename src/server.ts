import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');


import mongoose = require("mongoose"); //import mongoose

//routes
import { IndexRoute } from "./routes/indexRoute";
import { newUserRoute } from "./routes/newUserRoute";

//interfaces
import { IUser } from "./interfaces/user"; //import IUser
import { IEvent } from "./interfaces/event"; //import IEvent

//models
import { IModel } from "./models/model"; //import IModel
import { IUserModel } from "./models/user"; //import IUserModel
import { IEventModel } from "./models/event"; //import IEventModel

//schemas
import { userSchema } from "./schemas/user"; //import userSchema
import { eventSchema } from "./schemas/event"; //import userSchema


export class Server {

    public app: express.Application;

    private model: IModel; 

    public static bootstrap():Server {
        return new Server();
    }


    constructor(){

        this.model = Object(); 
        
        this.app = express();

        this.config();

        this.routes();

        this.api();
    }


    public api(){

    }


     public config() {
        const MONGODB_CONNECTION: string = "mongodb://localhost:27017/moveit";

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

        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;

        //connect to mongoose
        let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

        //create models
        this.model.user = connection.model<IUserModel>("User", userSchema);

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

                // Make our db accessible to our router ???

    }


    private routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);
        //newUserRoute
        newUserRoute.create(router);

        //use router middleware
        this.app.use(router);
    }
}