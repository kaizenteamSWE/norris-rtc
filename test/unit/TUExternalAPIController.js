/*
 * Name: TUExternalAPIController.js
 * Module: 
 * Location: Norris/test/unit
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
 * v0.02 2015-06-02 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var assert = require("assert");
var ExternalAPIController = require('../../main/ExternalAPIManager/ExternalAPIController.js');
//var NorrisImpl = require('../../main/DataModel/NorrisImpl.js');

describe('ExternalAPIController',function(){
    describe('ExternalAPIController(model: NorrisImpl, server: http, endpoint: String)',function(){
        it('should properly construct an ExternalAPIController object',function(){
            var model = {
                foo: 'bar',
                getSettings: function () {
                    return {};
                }
            }
            
            var server = {
                randomKey2: 'randomValue2'
            };
            
            var app = {
                use: function () {}
            }

            var extAPIContr = new ExternalAPIController(model, server, app);

            assert.deepEqual(model, extAPIContr.model);
            assert.deepEqual(server, extAPIContr.server);
            assert.deepEqual(app, extAPIContr.app);
        });
    });
    describe('performLogin(cookies: express::cookie, username: String, password: String): boolean',function(){
        it('should start a new session for the user',function(){
            var sample_cookie = {
                foo: 'bar'
            };

            var model = {
                settings: {
                    login: function (cookie) {
                        return cookie === sample_cookie;
                    }
                },
                getSettings: function () {
                    return this.settings;
                }
            };

            var app = {
                use: function () {}
            };

            var extAPIContr = new ExternalAPIController(model, {}, app);
            assert(extAPIContr.performLogin(sample_cookie));
            assert(!extAPIContr.performLogin({bar: 'foo'}));
        });
    });
    describe('performLogout(cookies: express::cookie): boolean',function(){
        it('should stop the session for the user',function(){
            var sample_cookie = {
                foo: 'bar'
            };

            var model = {
                settings: {
                    logout: function (cookie) {
                        return cookie === sample_cookie;
                    }
                },
                getSettings: function () {
                    return this.settings;
                }
            };

            var app = {
                use: function () {}
            };

            var extAPIContr = new ExternalAPIController(model, {}, app);
            assert(extAPIContr.performLogout(sample_cookie));
            assert(!extAPIContr.performLogout({bar: 'foo'}));
        });
    });
    describe('isLogged(cookies: express::cookies): boolean',function(){
        it('should verify if a user is authenticated',function(){
            var sample_cookie = {
                foo: 'bar'
            };

            var model = {
                settings: {
                    isLogged: function (cookie) {
                        return cookie === sample_cookie;
                    }
                },
                getSettings: function () {
                    return this.settings;
                }
            };

            var app = {
                use: function () {}
            };

            var extAPIContr = new ExternalAPIController(model, {}, app);
            assert(extAPIContr.isLogged(sample_cookie));
            assert(!extAPIContr.isLogged({bar: 'foo'}));
        });
    });
    describe('getServer: http',function(){
        it('should get the server',function(){

            var model = {
                randomKey1: 'randomValue1',
                getSettings: function () {
                    return {};
                }
            };

            var server = {
                randomKey2: 'randomValue2'
            };

            var app = {
                randomKey3: 'randomValue3',
                use: function () {}
            };

            var extAPIContr = new ExternalAPIController(model, server, app);
            assert.deepEqual(server, extAPIContr.getServer());
        });
    });
    describe('getEndpoint: String',function(){
        it('should get the endpoint',function(){

            var model = {
                settings: {
                    endpoint: 'sampleendpoint'
                },
                getSettings: function () {
                    return this.settings;
                },
                randomKey1: 'randomValue1'
            };
            
            var server = {
                randomKey2: 'randomValue2'
            };
            var app = {
                use: function () {}
            };

            var extAPIContr = new ExternalAPIController(model, server, app);

            assert.equal(model.settings.endpoint, extAPIContr.getEndpoint());
        });
    });
});