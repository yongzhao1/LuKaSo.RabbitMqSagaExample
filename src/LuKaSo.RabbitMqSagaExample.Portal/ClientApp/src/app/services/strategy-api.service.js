"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyApiService = void 0;
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var environment_1 = require("./../../environments/environment");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/Rx");
var StrategyApiService = /** @class */ (function () {
    function StrategyApiService(_http, strategyAddress) {
        this._http = _http;
        this.actionUrl = environment_1.environment.webApiBaseUrl + '/' + strategyAddress + "/configuration";
        this.headers = new http_1.HttpHeaders();
        this.headers = this.headers.append('Accept', 'application/json');
        this.headers = this.headers.append('Content-Type', 'application/json');
    }
    StrategyApiService.prototype.save = function (config) {
        var toAdd = JSON.stringify(config);
        return this._http
            .put(this.actionUrl, toAdd, { headers: this.headers })
            .do(function (_) { console.log('Save config service call started...'); })
            .catch(this.handleError);
    };
    StrategyApiService.prototype.get = function () {
        return this._http
            .get(this.actionUrl, { headers: this.headers })
            .do(function (_) { console.log('Get config service call started...'); })
            .catch(this.handleError);
    };
    StrategyApiService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors = '';
        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return rxjs_1.Observable.throw(applicationError || modelStateErrors || 'Server error');
    };
    return StrategyApiService;
}());
exports.StrategyApiService = StrategyApiService;
//# sourceMappingURL=strategy-api.service.js.map