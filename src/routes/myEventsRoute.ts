
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
        Event.find({ creator: req.user.username }, { picture: 0 }, function (err, events) {
            if (err) {
                res.json(err);
            } else {
                let now: Date = new Date();
                events = events.filter(function (e) {
                    return e.starttimepoint.getTime() >= now.getTime();
                });
                events.sort(function (a, b) {
                    return a.starttimepoint.getTime() - b.starttimepoint.getTime();
                });
                res.json(events);
            }
        });
    }
}