
import { BaseRoute } from './baseRoute';

export class HomeRoute extends BaseRoute {
    public static create(router) {
        console.log("Create home route");

        /* GET Home Page */
        router.get('/home', (req, res, next) => {
            if (req.isAuthenticated()) {
                new HomeRoute().home(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public home(req, res, next) {
        this.title = "Home";

        let options: Object = {
            'message': "Du bist eingeloggt ;-)"
        };

        this.render(req, res, 'Home', options);
    }
}