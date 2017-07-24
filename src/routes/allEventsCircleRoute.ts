
import * as Event from '../models/event';    // import Event

import { BaseRoute } from './baseRoute';

export class AllEventsCircleRoute extends BaseRoute {
    public static create(router) {
        console.log("Create all events circle route");

        /**
        @api {get} /allEventsCircle?lon=:lon&lat=:lat&dis=:dis Alle Events im Umkreis
        @apiName GetAllEventsCircle
        @apiGroup Event
        
        @apiParam {Number} lon Longitude aktuelle Position
        @apiParam {Number} lat Latitude aktuelle Position
        @apiParam {Number} dis Radius des Umkreis in Meter
 
        @apiSuccess {Event[]} response Alle Events im Umkreis
        @apiSuccess {Event} response.event Ein Event im Umkreis
        */
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
        let lon: number = req.query.lon;
        let lat: number = req.query.lat;
        let dis: number = req.query.dis;

        if (lon && lat && dis) {
            Event.find({}, { picture: 0 }, function (err, events) {
                if (err) {
                    res.json(err);
                } else {

                    let array = events.filter(function (e) {
                        return AllEventsCircleRoute.measure(lat, lon, e.latitude, e.longitude) <= dis;
                    });

                    let now: Date = new Date();
                    array = array.filter(function (e) {
                        return e.starttimepoint.getTime() >= now.getTime();
                    });

                    array.forEach(e => {
                        e.distA = AllEventsCircleRoute.measure(lat, lon, e.latitude, e.longitude);
                    });

                    res.json(array);
                }
            });
        } else {
            res.json({ message: "No lon, lat and dis" });
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