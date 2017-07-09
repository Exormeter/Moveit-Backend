
import * as User from '../models/user';      // import User

import { BaseRoute } from './baseRoute';

export class UserTokenRoute extends BaseRoute {
    public static create(router) {
        console.log("Create user token route");

        /**
        @api {get} /getUserToken Der Token eines Benutzernamens
        @apiName GetUserToken
        @apiGroup User
 
        @apiSuccess {String} response userToken

        @apiError {String} message No such username
        */
        router.get('/getUserToken', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserTokenRoute().getUserToken(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        /**
        @api {get} /setUserToken Setzt den Token eines Benutzernamens
        @apiName SetUserToken
        @apiGroup User
 
        @apiSuccess {String} message Token updated

        @apiError {String} message No token
        */
        router.post('/setUserToken', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserTokenRoute().setUserToken(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public getUserToken(req, res, next) {
        let username: string = req.query.username;
        if (username) {
            User.findOne({ username: username }, { _id: 0, pushToken: 1 }, function (err, token) {
                if (err) {
                    res.json(err);
                } else {
                res.json(token);
                }
            });
        } else {
            res.json({ message: "No such username" });
        }
    }

    public setUserToken(req, res, next) {
        let token: string = req.body.token;
        if (token) {
            req.user.update({ pushToken: token }, function (err, updated) {
                if (err) {
                    res.json(err);
                } else {
                res.json({ message: "Token updated" });
                }
            });
        } else {
            res.json({ message: "No token" });
        }
    }
}
