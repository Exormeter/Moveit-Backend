
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
        router.post('/login', passport.authenticate('login', function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            // res.redirect('/users/' + req.user.username);
            res.json({message: 'Login erfolgreich'});
        }));
    }

    constructor() {
        super();
    }

    public login(req, res, next) {
        console.log("Login Route angesurft");
        this.title = "Login";

        let options: Object = {
            'message': req.flash('message')
        };

        this.render(req, res, 'Login', options);
    }
}