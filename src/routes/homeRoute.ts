import * as Event from '../models/event';    // import Event

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
            'message': "Du bist eingeloggt ;-)",
            'user': req.user
        };

        Event.find({ creator: req.user.username }, (err1, event1) => {
            Event.find({ subscriber: req.user.username }, (err2, event2) => {
                options['event1'] = event1;
                options['event2'] = event2;
                this.render(req, res, 'Home', options);
            });
        });
    }
}