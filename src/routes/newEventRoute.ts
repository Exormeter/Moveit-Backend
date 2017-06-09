
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class NewEventRoute extends BaseRoute {
    public static create(router) {
        console.log("Create new event route");

        /* GET New Event Page */
        router.get('/newEvent', (req, res, next) => {
            if (req.isAuthenticated()) {
                new NewEventRoute().form(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        /**
        @api {post} /newEvent Neues Event erstellen
        @apiName PostNewEvent
        @apiGroup Event
 
        @apiSuccess {String} message Event erstellt

        */
        router.post('/newEvent', (req, res, next) => {
            if (req.isAuthenticated()) {
                new NewEventRoute().newEvent(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public form(req, res, next) {
        console.log("New Event Route angesurft");

        this.title = "New Event";

        let options: Object = {
            'message': "New Event anlegen",
            'user': req.user
        };

        this.render(req, res, 'NewEvent', options);
    }

    public newEvent(req, res, next) {
        new Event({
            creator: req.user.username,
            title: req.body.title,
            keywords: req.body.keywords.split(','),
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            starttimepoint: req.body.starttimepoint,
            subscriber: req.body.subscriber.split(',')
        }).save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ message: 'Event erstellt' });
            }
        });
    }
}