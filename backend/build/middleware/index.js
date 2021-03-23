"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = exports.applyMiddleware = void 0;
exports.applyMiddleware = function (middlewareWrappers, router) {
    for (var _i = 0, middlewareWrappers_1 = middlewareWrappers; _i < middlewareWrappers_1.length; _i++) {
        var wrapper = middlewareWrappers_1[_i];
        wrapper(router);
    }
};
exports.applyRoutes = function (routes, router) {
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var route = routes_1[_i];
        var method = route.method, path = route.path, handler = route.handler;
        router[method](path, handler);
    }
};
module.exports.applyMiddleware = exports.applyMiddleware;
module.exports.applyRoutes = exports.applyRoutes;
