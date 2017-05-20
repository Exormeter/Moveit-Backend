import * as User from '../models/user';      // import User
import * as Event from '../models/event';    // import Event
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class LoginRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("Create loginRoute");

        /* GET login page. */
        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().login(req, res, next);
        });

        /* Handle Login POST */
        router.post('/login', passport.authenticate('login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        }));
    }

    constructor() {
        super();
    }

    public login(req: Request, res: Response, next: NextFunction) {
        console.log("Login Route angesurft");
        this.title = "Login";

        let options: Object = {
            'message': "Login"
        };

        this.render(req, res, 'Login', options);
    }
}