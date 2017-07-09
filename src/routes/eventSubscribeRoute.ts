
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class EventSubscribeRoute extends BaseRoute {
    public static create(router) {
        console.log("Create event subscribe route");

        /**
        @api {get} /eventSubscribe?eventID=:eventID An Event teilnehmen
        @apiName GetEventSubscribe
        @apiGroup Event
        
        @apiParam {ID} eventID Event ID
 
        @apiSuccess {String} message Event updated
        */
        router.get('/eventSubscribe', (req, res, next) => {
            if (req.isAuthenticated()) {
                new EventSubscribeRoute().subscribe(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

    }

    constructor() {
        super();
    }

    public subscribe(req, res, next) {
        let eventID: number = req.query.eventID;
        if (eventID) {
            Event.findById(eventID, function (err, event) {
                if (err) {
                    res.json(err);
                } else {

                var subs = event.subscriber;
                if (subs) {
                    if (subs.indexOf(req.user.username) < 0) {
                        subs.push(req.user.username);
                    }
                } else {
                    subs = [req.user.username];
                }

                event.update({ subscriber: subs }, function (err, updated) {
                    if (err) {
                        res.json(err);
                    } else {

                    res.json({ message: "Event updated" });
                    }
                });
                }
            });
        } else {
            res.json({ message: "No eventID" });
        }
    }
}