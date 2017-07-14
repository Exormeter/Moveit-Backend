
import * as Event from '../models/event';    // import Event

var passwordh = require('password-hash-and-salt');

import { BaseRoute } from './baseRoute';

export class UserRoute extends BaseRoute {
    public static create(router) {
        console.log("Create user route");

        /**
        @api {get} /user Aktueller Benutzer
        @apiName GetUser
        @apiGroup User
 
        @apiSuccess {User} response Aktueller Benutzer
        */
        router.get('/user', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserRoute().user(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        /**
        @api {post} /userEmail Ändert aktuelle Benutzerdaten
        @apiName PostUserEmail
        @apiGroup User
 
        @apiSuccess {String} message Email changed succesful

        @apiError {String} message Emails not match
        */
        router.post('/userEmail', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserRoute().changeEmail(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        /**
        @api {post} /userPassword Ändert aktuelle Benutzerdaten
        @apiName PostUserPassword
        @apiGroup User
 
        @apiSuccess {String} message Password changed succesful

        @apiError {String} message Passwords not match
        */
        router.post('/userPassword', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserRoute().changePassword(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        router.get('/userDelete', (req, res, next) => {
            if (req.isAuthenticated()) {
                new UserRoute().delete(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public user(req, res, next) {
        res.json(req.user);
    }

    public changeEmail(req, res, next) {
        let email1: String = req.body.email1;
        let email2: String = req.body.email2;
        if (email1 && email1 === email2) {
            req.user.update({ email: email1 }, function (err, data) {
                if (err)
                    res.json(err);
                res.json({ message: "Email changed succesful" });
            });
        } else {
            res.json({ message: "Emails not match" })
        }
    }

    public changePassword(req, res, next) {
        let password1: String = req.body.password1;
        let password2: String = req.body.password2;
        if (password1 && password1 === password2) {
            passwordh(password1).hash(function (err, hash) {
                if (err)
                    res.json(err);
                req.user.update({ password: hash }, function (err, data) {
                    if (err)
                        res.json(err);
                    res.json({ message: "Password changed succesful" });
                });
            });
        } else {
            res.json({ message: "Passwords not match" });
        }
    }

    public delete(req, res, next) {
        let userToDelete = req.user;
        req.logout();
        Event.remove({ creator: userToDelete.username }, function (err) {
            if (err) {
                res.json(err);
            } else {
                userToDelete.remove(function (err, updated) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json({ message: "User deleted" });
                    }
                });
            }
        });
    }
}