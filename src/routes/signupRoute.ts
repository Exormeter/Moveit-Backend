
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
        router.post('/signup', passport.authenticate('signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }));
    }

    constructor() {
        super();
    }

    public signup(req, res, next) {
        console.log("Signup Route angesurft");
        this.title = "Signup";

        let options: Object = {
            'message': req.flash('message')
        };

        this.render(req, res, 'Signup', options);
    }
}
