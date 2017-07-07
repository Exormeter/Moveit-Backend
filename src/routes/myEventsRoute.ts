
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class MyEventsRoute extends BaseRoute {
    public static create(router) {
        console.log("Create my events route");

        /**
        @api {get} /myEvents Alle Events des Benutzers
        @apiName GetMyEvents
        @apiGroup Event
 
        @apiSuccess {Event[]} response Alle Events des Benutzers
        @apiSuccess {Event} response.event Ein Event des Benutzers
        */
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
        Event.find({ creator: req.user.username }, function (err, events) {
            if (err) {
                res.json(err);
            }
            res.json(events);
        });
    }
}