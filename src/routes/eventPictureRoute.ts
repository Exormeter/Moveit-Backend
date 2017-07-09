
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class EventPictureRoute extends BaseRoute {
    public static create(router) {
        console.log("Create event picture route");

        router.get('/getEventPicture', (req, res, next) => {
            if (req.isAuthenticated()) {
                new EventPictureRoute().get(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        router.post('/setEventPicture', (req, res, next) => {
            if (req.isAuthenticated()) {
                new EventPictureRoute().set(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public get(req, res, next) {
        let eventID: number = req.query.eventID;
        if (eventID) {
            Event.findById(eventID, { _id: 0, picture: 1 }, function (err, event) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(event);
                }
            });
        } else {
            res.json({ message: "No eventID" });
        }
    }

    public set(req, res, next) {
        let eventID: number = req.body.eventID;
        let pic: string = req.body.picture;
        if (eventID && pic) {
            Event.findByIdAndUpdate(eventID, { picture: pic }, function (err, updated) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({ message: "Event updated" });
                }
            });
        } else {
            res.json({ message: "No eventID and picture" });
        }
    }
}