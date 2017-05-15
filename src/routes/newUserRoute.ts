import { IUser } from "../interfaces/user";
import { User } from "../models/user";
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

export class newUserRoute extends BaseRoute {

    public static create(router: Router) {
        console.log("Create newUserRoute");

        router.get("/newUser", (req: Request, res: Response, next: NextFunction) => {
            new newUserRoute().register(req, res, next);
        });


    }

    constructor() {
        super();
    }

    public register(req: Request, res: Response, next: NextFunction) {
        console.log("Route angesurft");
        const newUser = new User(
            {firstName: "Tobias",
            lastName: "Foobar",
            email: "user@email.com",
            birthdate: "2017-01-01",
            sex: "male",
            picture: "none"}
        );
        newUser.save();


    }

}
