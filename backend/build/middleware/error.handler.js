"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPClientError = /** @class */ (function (_super) {
    __extends(HTTPClientError, _super);
    function HTTPClientError(message) {
        var _this = this;
        if (message instanceof Object) {
            _this = _super.call(this, JSON.stringify(message)) || this;
        }
        else {
            _this = _super.call(this, message) || this;
        }
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return HTTPClientError;
}(Error));
var HTTP400Error = /** @class */ (function (_super) {
    __extends(HTTP400Error, _super);
    function HTTP400Error(message) {
        if (message === void 0) { message = 'Bad Request'; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = 400;
        return _this;
    }
    return HTTP400Error;
}(HTTPClientError));
var HTTP404Error = /** @class */ (function (_super) {
    __extends(HTTP404Error, _super);
    function HTTP404Error(message) {
        if (message === void 0) { message = 'Not found'; }
        var _this = _super.call(this, message) || this;
        _this.statusCode = 404;
        return _this;
    }
    return HTTP404Error;
}(HTTPClientError));
var notFoundError = function () {
    throw new HTTP404Error('Method not found.');
};
var clientError = function (err, res, next) {
    if (err instanceof HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
var serverError = function (err, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    }
    else {
        res.status(500).send(err.stack);
    }
};
var handle404Error = function (router) {
    router.use(function (req, res) {
        notFoundError();
    });
};
var handleClientError = function (router) {
    router.use(function (err, req, res, next) {
        clientError(err, res, next);
    });
};
var handleServerError = function (router) {
    router.use(function (err, req, res, next) {
        serverError(err, res, next);
    });
};
exports.default = [handle404Error, handleClientError, handleServerError];
