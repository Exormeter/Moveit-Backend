import { IUser } from "../interfaces/user";
import { IUserModel } from "../models/user";
import { userSchema } from "../schemas/user";
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute} from './baseRoute';




export class newUserRoute extends BaseRoute{

    public static create(router: Router) {
        console.log("Create index route");

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new newUserRoute().index(req, res, next);
        })
    }

}