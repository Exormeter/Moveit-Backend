
import { BaseRoute } from './baseRoute';

var passport = require('passport');

export class SignupRoute extends BaseRoute {
    public static create(router) {
        console.log("Create signup route");

        /* GET Registration Page */
        router.get("/signup", (req, res, next) => {
            if (req.isAuthenticated()) {
                res.redirect('/home');
            } else {
                new SignupRoute().signup(req, res, next);
            }
        });

        /* Handle Registration POST */
        router.post('/signup', function (req, res, next) {
            passport.authenticate('signup', function (err, user, info) {
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

    public signup(req, res, next) {
        console.log("Signup Route angesurft");
        this.title = "Signup";

        let options: Object = {
            'message': 'Sign Up'
        };

        this.render(req, res, 'Signup', options);
    }
}
