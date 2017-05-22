
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class MyEventsSubscriberRoute extends BaseRoute {
    public static create(router) {
        console.log("Create my events subscriber route");

        router.get('/myEventsSubscriber', (req, res, next) => {
            if (req.isAuthenticated()) {
                new MyEventsSubscriberRoute().events(req, res, next);
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

        Event.find({ subscriber: req.user.username }, function (err, events) {
            if (err) {
                res.json(err);
            }
            res.json(events);
        });
    }
}