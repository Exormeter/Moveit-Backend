import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './baseRoute';

export class IndexRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("Create index route");

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        })
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "Home";

        let options: Object = {
            'message': "Welcome"
        };

        this.render(req, res, 'HelloWorld', options);
    }
}