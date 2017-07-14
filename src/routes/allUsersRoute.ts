
import * as User from '../models/user';      // import User

import { BaseRoute } from './baseRoute';

export class AllUsersRoute extends BaseRoute {
    public static create(router) {
        console.log("Create all users route");

        /**
        @api {get} /allUsers Alle Benutzernamen und pushToken
        @apiName GetAllUsers
        @apiGroup User
 
        @apiSuccess {String[]} response Alle Benutzernamen und pushToken
        @apiSuccess {String} response.benutzernameAndPushToken Ein Benutzername und pushToken
        */
        router.get('/allUsers', (req, res, next) => {
            if (req.isAuthenticated()) {
                new AllUsersRoute().users(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public users(req, res, next) {
        User.find({}, { _id: 0, username: 1, pushToken: 1 }, function (err, users) {
            if (err) {
                res.json(err);
            } else {
                res.json(users);
            }
        });
    }
}