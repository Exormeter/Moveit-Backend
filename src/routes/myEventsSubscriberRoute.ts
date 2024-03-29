
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class MyEventsSubscriberRoute extends BaseRoute {
    public static create(router) {
        console.log("Create my events subscriber route");

        /**
        @api {get} /myEventsSubscriber Alle Events, an denen der Benutzer teilnimmt
        @apiName GetMyEventsSubscriber
        @apiGroup Event
 
        @apiSuccess {Event[]} response Alle Events, an denen der Benutzer teilnimmt
        @apiSuccess {Event} response.event Ein Event, an dem der Benutzer teilnimmt
        */
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
        Event.find({ subscriber: req.user.username }, { picture: 0 }, function (err, events) {
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