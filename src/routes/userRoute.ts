
import { BaseRoute } from './baseRoute';

export class UserRoute extends BaseRoute {
    public static create(router) {
        console.log("Create user route");

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