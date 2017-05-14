import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

// benoetigt...
import mongoose = require('mongoose');

export class newUserRoute extends BaseRoute {

    public static create(router: Router) {
        console.log("Create newUserRoute");

        router.post("/newUser", (req: Request, res: Response, next: NextFunction) => {
            let user: mongoose.Model<IUserModel>;
            user = mongoose.model<IUserModel>("User", userSchema);
            let data: IUser;
            data = {
                firstName: "Tobias",
                lastName: "Foobar",
                email: "user@email.com",
                birthdate: "2017-01-01",
                sex: "male",
                picture: "none"
            };
            new user(data).save().then(result => {
                if (result) {
                    new newUserRoute().render(req, res, 'New User Route', {
                        'message': "Success"
                    });
                } else {
                    new newUserRoute().render(req, res, 'New User Route', {
                        'message': "Failure"
                    });
                }
            });
        })
    }
}
