
import * as User from '../models/user';      // import User

import { BaseRoute } from './baseRoute';

export class AllUsersRoute extends BaseRoute {
    public static create(router) {
        console.log("Create all users route");

        /**
        @api {get} /allUsers Alle Benutzernamen
        @apiName GetAllUsers
        @apiGroup User
 
        @apiSuccess {String[]} response Alle Benutzernamen
        @apiSuccess {String} response.benutzername Ein Benutzername
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
        console.log("All Users Route angesurft");

        User.find( function (err, users) {
            if (err) {
                req.json(err);
            }
            var usernames = [];
            users.forEach(element => {
                usernames.push([element.username, element.pushToken]);
            });
            res.json(usernames);
        });
    }
}