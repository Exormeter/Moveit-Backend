
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

    }

    constructor() {
        super();
    }

    public user(req, res, next) {
        console.log("User Route angesurft");

        res.json(req.user);
    }
}