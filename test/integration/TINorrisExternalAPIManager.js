/*
 * Name: TINorrisDataModel.js
 * Module: 
 * Location: Norris/test/integration
 * Date: 2015-05-25
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara Approved
 * ================================================================================
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-25 Carlon Chiara Creation
 * ================================================================================
 */
var ExternalAPIManager = require('../../main/ExternalAPIManager');

var assert = require("assert");

describe('Norris::ExternalAPIManager',function () {

    it('should instantiate the auth endpoint properly', function () {
        var called = {};
        var model = {
            on: function () {},
            getSettings: function () {
                return {
                    endpoint: 'endpoint/'
                };
            }
        };
        var server = {};
        var app = {
            use: function () {},
            get: function () {},
            post: function (path) {
                called[path] = true;
            }
        };

        ExternalAPIManager.getInstance().construct(model, server, app);

        assert(called['endpoint/auth/login']);
        assert(called['endpoint/auth/keepalive']);
        assert(called['endpoint/auth/logout']);
    });

    it('should instantiate the list endpoint properly', function () {
        var called = {};
        var model = {
            on: function () {},
            getSettings: function () {
                return {
                    endpoint: 'endpoint/'
                };
            }
        };
        var server = {};
        var app = {
            use: function () {},
            get: function (path) {
                called[path] = true;
            },
            post: function () {}
        };

        ExternalAPIManager.getInstance().construct(model, server, app);

        assert(called['endpoint/list']);
    });

    it('should should listen to create event', function () {
        var called = false;
        var model = {
            on: function (event) {
                if(event === 'create') {
                    called = true;
                }
            },
            getSettings: function () {
                return {
                    endpoint: 'endpoint/'
                };
            }
        };
        var server = {};
        var app = {
            use: function () {},
            get: function () {},
            post: function () {}
        };

        ExternalAPIManager.getInstance().construct(model, server, app);

        assert(called);
    });

});