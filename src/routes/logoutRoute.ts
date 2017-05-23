
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class LogoutRoute extends BaseRoute {
    public static create(router) {
        console.log("Create logout route");

        /* Handle Logout */
        router.get('/logout', function (req, res, next) {
            if (req.isAuthenticated()) {
                req.logout();
                new LogoutRoute().success(req, res, next);
            } else {
                res.redirect('/login');
                new LogoutRoute().failure(req, res, next);
            }
        });
    }

    constructor() {
        super();
    }

    public success(req, res, next) {
        console.log("Logout Route success angesurft");
        res.json("Logout erfolgreich");
    }

    public failure(req, res, next) {
        console.log("Logout Route failure angesurft");
        res.json("Nicht angemeldet");
    }
}