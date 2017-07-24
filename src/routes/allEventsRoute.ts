
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class AllEventsRoute extends BaseRoute {
    public static create(router) {
        console.log("Create all events route");

        /**
        @api {get} /allEvents?lon=:lon&lat=:lat&dis=:dis Alle Events sortiert nach Teilnehmen und Distanz
        @apiName GetAllEvents
        @apiGroup Event
        
        @apiParam {Number} lon Longitude aktuelle Position
        @apiParam {Number} lat Latitude aktuelle Position
 
        @apiSuccess {Event[]} response Alle Events
        @apiSuccess {Event} response.event Ein Event
        */
        router.get('/allEvents', (req, res, next) => {
            if (req.isAuthenticated()) {
                new AllEventsRoute().allEvents(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

    }

    constructor() {
        super();
    }

    public allEvents(req, res, next) {
        let lon: number = req.query.lon;
        let lat: number = req.query.lat;
        if (lon && lat) {
            Event.find({}, { picture: 0 }, function (err, events) {
                if (err) {
                    res.json(err);
                } else {
                    events.forEach(e => {
                        e.distA = AllEventsRoute.measure(lat, lon, e.latitude, e.longitude);
                    });

                    events.sort(function (a, b) {
                        if (a.distA < b.distA) {
                            return -1;
                        } else if (a.distA > b.distA) {
                            return +1;
                        } else {
                            return 0;
                        }
                    });

                    /*
                    events.sort(function (a, b) {
                        if (a.creator === req.user.username) {
                            if (b.creator === req.user.username) {
                                return 0;
                            } else {
                                return -1;
                            }
                        } else {
                            if (b.creator === req.user.username) {
                                return +1;
                            } else {
                                return 0;
                            }
                        }
                    });
                    */

                    let now: Date = new Date();
                    events = events.filter(function (e) {
                        return e.starttimepoint.getTime() >= now.getTime();
                    });

                    res.json(events);
                }
            });
        } else {
            res.json({ message: "No lon and lat" });
        }
    }

    private static measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d * 1000; // meters
    }
}