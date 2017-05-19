import * as User from '../models/user';      // import User
import * as Event from '../models/event';    // import Event
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

export class loginRoute extends BaseRoute{
    public static create(router: Router) {
        console.log("Create loginRoute");

        router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            new loginRoute().login(req, res, next);
        });
    }

    constructor() {
        super();
    }

    public login(req: Request, res: Response, next: NextFunction)
    {
        console.log("Login Route angesurft");
        console.log(req.body);
        User.findOne({username: req.body.username}, function (err, o) {
        if (o == null) {
            console.log('Username existiert nicht');
        }
        else {
            if (o.password === req.body.password) {
                console.log(o);
            }

            else {
                console.log("Passwort oder Username falsch")
            }
        }
    });
    }
}