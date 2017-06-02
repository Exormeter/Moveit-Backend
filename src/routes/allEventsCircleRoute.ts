
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class AllEventsCircleRoute extends BaseRoute {
    public static create(router) {
        console.log("Create all events circle route");

        router.get('/allEventsCircle', (req, res, next) => {
            if (req.isAuthenticated()) {
                new AllEventsCircleRoute().circle(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

    }

    constructor() {
        super();
    }

    public circle(req, res, next) {
        console.log("All Events Circle Route angesurft");

        Event.find({}, function (err, events) {
            if (err) {
                res.json(err);
            }
            let lon: number = req.query.lon;
            let lat: number = req.query.lat;
            let dis: number = req.query.dis;
            console.log(lon);
            console.log(lat);
            console.log(dis);
            let array = [];
            events.forEach(element => {
                if (Math.sqrt(((lon - element.longitude) * (lon - element.longitude)) + ((lat - element.latitude) * (lat - element.latitude))) <= dis) {
                    array.push(element);
                }
            });
            res.json(array);
        });
    }
}