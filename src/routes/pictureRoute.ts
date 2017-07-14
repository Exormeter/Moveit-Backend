
import * as User from '../models/user';      // import User

import { BaseRoute } from './baseRoute';

export class PictureRoute extends BaseRoute {
    public static create(router) {
        console.log("Create picture route");

        router.get('/getPicture', (req, res, next) => {
            if (req.isAuthenticated()) {
                new PictureRoute().get(req, res, next);
            } else {
                res.redirect('/login');
            }
        });

        router.post('/setPicture', (req, res, next) => {
            if (req.isAuthenticated()) {
                new PictureRoute().set(req, res, next);
            } else {
                res.redirect('/login');
            }
        });
    }

    constructor() {
        super();
    }

    public get(req, res, next) {
        let username: number = req.query.username;
        if (username) {
            User.findOne({ username: username }, { _id: 0, picture: 1 }, function (err, user) {
                if (err) {
                    res.json(err);
                } else {

                    res.json(user);
                }
            });
        } else {
            res.json({ message: "No username" });
        }
    }

    public set(req, res, next) {
        let pic: string = req.body.picture;
        if (pic) {
            req.user.update({ picture: pic }, function (err, updated) {
                if (err) {
                    res.json(err);
                } else {

                    res.json({ message: "User updated" });
                }
            });
        } else {
            res.json({ message: "No picture" });
        }
    }
}