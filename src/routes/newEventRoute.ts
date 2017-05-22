
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

        /* POST New Event Page */
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
            'message': "New Event anlegen ... " + req.flash('message'),
            'user': req.user
        };

        this.render(req, res, 'NewEvent', options);
    }

    public newEvent(req, res, next) {
        new Event({
            creator: req.user.username,
            title: req.param('title'),
            keywords: req.param('keywords').split(','),
            longitude: req.param('longitude'),
            latitude: req.param('latitude'),
            starttimepoint: req.param('starttimepoint'),
            subscriber: req.param('subscriber').split(',')
        }).save((err) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/home');
        });
    }
}