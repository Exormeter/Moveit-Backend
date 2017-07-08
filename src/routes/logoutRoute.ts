
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class LogoutRoute extends BaseRoute {
    public static create(router) {
        console.log("Create logout route");

        /**
        @api {get} /logout Logout
        @apiName GetLogout
        @apiGroup User
 
        @apiSuccess {String} response Logout erfolgreich

        @apiError {String} response Nicht angemeldet
        */
        router.get('/logout', function (req, res, next) {
            if (req.isAuthenticated()) {
                req.logout();
                new LogoutRoute().success(req, res, next);
            } else {
                new LogoutRoute().failure(req, res, next);
            }
        });
    }

    constructor() {
        super();
    }

    public success(req, res, next) {
        res.json("Logout erfolgreich");
    }

    public failure(req, res, next) {
        res.json("Nicht angemeldet");
    }
}