import * as User from '../models/user';      // import User
import * as Event from '../models/event';    // import Event
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

export class newUserRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("Create newUserRoute");

        router.get("/newUser", (req: Request, res: Response, next: NextFunction) => {
            new newUserRoute().readAll(req, res, next);
        });

        router.post("/newUser", (req: Request, res: Response, next: NextFunction) => {
            new newUserRoute().create(req, res, next);
        });

        router.get("/newUser/:name", (req: Request, res: Response, next: NextFunction) => {
            new newUserRoute().findOne(req, res, next);
        });
    }

    constructor() {
        super();
    }

    /**
     * Anfrage:
     * POST http://localhost:8080/newUser
     * Content-Type: application/json
     * {"firstName":"Tobias","lastName":"Foobar","email":"user@email.com","birthdate":"2017-01-01","sex":"male","picture":"none"}
     * 
     * Antwort:
     * {"info":"User saved successfully","data":{"__v":0,"createdAt":"2017-05-16T07:50:08.023Z","firstName":"Tobias","lastName":"Foobar","email":"user@email.com","birthdate":"2017-01-01","sex":"male","picture":"none","_id":"591aaf30cb98e421b0e755ec"}}
     */
    public create(req: Request, res: Response, next: NextFunction) {
        console.log("Create Route angesurft");
        console.log(req.body);
        var newUser = new User(req.body);
        newUser.save((err) => {
            if (err) {
                res.json({ info: 'error during User create', error: err });
            }
            res.json({ info: 'User saved successfully', data: newUser });
        });
    }

    /**
     * Anfrage: http://localhost:8080/newUser
     * 
     * Antwort: {"info":"Users found successfully","data":[]}
     */
    public readAll(req: Request, res: Response, next: NextFunction) {
        console.log("Read All Route angesurft");
        User.find((err, Users) => {
            if (err) {
                res.json({ info: 'error during find Users', error: err });
            }
            res.json({ info: 'Users found successfully', data: Users });
        });
    }

    /**
     * Anfrage:
     * http://localhost:8080/newUser/Tobias
     * 
     * Antwort:
     * {"info":"User found successfully","data":{"_id":"591aaf30cb98e421b0e755ec","createdAt":"2017-05-16T07:50:08.023Z","firstName":"Tobias","lastName":"Foobar","email":"user@email.com","birthdate":"2017-01-01","sex":"male","picture":"none","__v":0}}
     */
    public findOne(req: Request, res: Response, next: NextFunction) {
        console.log("Find One Route angesurft");
        console.log(req.params.name);
        var query = { firstName: req.params.name };
        User.findOne(query, function (err, User) {
            if (err) {
                res.json({ info: 'error during find User', error: err });
            }
            if (User) {
                res.json({ info: 'User found successfully', data: User });
            } else {
                res.json({ info: 'User not found with name: ' + req.params.name });
            }
        });
    }
}
