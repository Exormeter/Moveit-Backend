"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoute_1 = require("./baseRoute");
class IndexRoute extends baseRoute_1.BaseRoute {
    static create(router) {
        console.log("Create index route");
        router.get("/", (req, res, next) => {
            new IndexRoute().index(req, res, next);
        });
    }
    constructor() {
        super();
    }
    index(req, res, next) {
        this.title = "Home";
        let options = {
            'message': "Welcome"
        };
        this.render(req, res, 'HelloWorld', options);
    }
}
exports.IndexRoute = IndexRoute;
