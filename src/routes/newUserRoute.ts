import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';




export class newUserRoute extends BaseRoute {

    public static create(router: Router) {
        console.log("Create newUserRoute");

        router.post("/newUser", (req: Request, res: Response, next: NextFunction) => {
            // ???
        })
    }

/*
    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "newUserRoute";

        let options: Object = {
            'message': "Welcome to newUserRoute"
        };


        this.render(req, res, 'HelloWorld', options);
    }
*/

}