
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class LoginRoute extends BaseRoute {
    public static create(router) {
        console.log("Create login route");

        /* GET login page. */
        router.get("/login", (req, res, next) => {
            new LoginRoute().login(req, res, next);
        });

        /* Handle Login POST */
        router.post('/login', function (req, res, next) {
            passport.authenticate('login', function (err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.json(info); }
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    return res.json(info);
                });
            })(req, res, next);
        });
    }

    constructor() {
        super();
    }

    public login(req, res, next) {
        console.log("Login Route angesurft");
        this.title = "Login";

        let options: Object = {
            'message': 'anmelden...'
        };

        this.render(req, res, 'Login', options);
    }
}