
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class MyEventsRoute extends BaseRoute {
    public static create(router) {
        console.log("Create my events route");

        router.get('/myEvents', (req, res, next) => {
            if (req.isAuthenticated()) {
                new MyEventsRoute().events(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

    }

    constructor() {
        super();
    }

    public events(req, res, next) {
        console.log("My Events Route angesurft");

        Event.find({ creator: req.user.username }, function (err, events) {
            if (err) {
                res.json(err);
            }
            res.json(events);
        });
    }
}