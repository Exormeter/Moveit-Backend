import * as User from '../models/user';      // import User
import * as Event from '../models/event';    // import Event
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class SignupRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("Create signup route");

        /* GET Registration Page */
        router.get("/signup", (req: Request, res: Response, next: NextFunction) => {
            new SignupRoute().signup(req, res, next);
        });

        /* Handle Registration POST */
        router.post('/signup', passport.authenticate('signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }));
    }

    constructor() {
        super();
    }

    public signup(req: Request, res: Response, next: NextFunction) {
        console.log("Signup Route angesurft");
        this.title = "Signup";

        let options: Object = {
            'message': "Signup"
        };

        this.render(req, res, 'Signup', options);
    }
}
