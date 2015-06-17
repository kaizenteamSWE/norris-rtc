/*
 * Name: TUAuthenticationEndpoint.js
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
 * v0.01 2015-05-25 Pavanello Fabio Matteo Creation
 * ================================================================================
 */

var AuthenticationEndpoint = require('../../main/ExternalAPIManager/AuthenticationEndpoint.js');
var express=require('express');
var http = require('http');


var assert = require("assert");

describe('AuthenticationEndpoint', function(){
    
    describe('AuthenticationEndpoint(controller: ExternalAPIController)', function(){
        it('should create a new AuthenticationEndpoint object',function(){
            var controller = {
                randomKey1: 'randomValue1',
                getApp: function () {
                    return {
                        post: function () {}
                    };
                },
                getEndpoint: function () {return 'endpoint';}
            };

            var endpoint = new AuthenticationEndpoint(controller);
            var expected_endpoint = {
                controller: controller,
                app: controller.getApp()
            };

            assert.equal(JSON.stringify(expected_endpoint), JSON.stringify(endpoint));
        });
        
    });
    
    describe('handleLogin(req: express, res: express)', function(){
        it('should manage a login request',function(){
            var called = false

            var controller = {
                getApp: function () {
                    return {
                        post: function () {}
                    }
                },
                getEndpoint: function () {
                    return 'endpoint';
                },
                performLogin: function () {
                    called = true;
                    return true;
                }
            };

            var req = {
                body: {
                    username: 'user',
                    password: 'pass'
                }
            }

            var res = {
                sendStatus: function () {}
            }

            var endpoint = new AuthenticationEndpoint(controller);
            endpoint.handleLogin(req, res);

            assert(called);
        });
        
    });
    
    describe('handleLogout(req: express, res: express)', function(){
        it('should manage a logout request',function(){
            var called = false

            var controller = {
                getApp: function () {
                    return {
                        post: function () {}
                    }
                },
                getEndpoint: function () {
                    return 'endpoint';
                },
                performLogout: function () {
                    called = true;
                    return true;
                }
            };

            var req = {}

            var res = {
                sendStatus: function () {}
            }

            var endpoint = new AuthenticationEndpoint(controller);
            endpoint.handleLogout(req, res);

            assert(called);
        });
        
        describe('handleKeepAlive(req: express, res: express)', function(){
        it('should manage a keepalive request',function(){
            var called = false

            var controller = {
                getApp: function () {
                    return {
                        post: function () {}
                    }
                },
                getEndpoint: function () {
                    return 'endpoint';
                },
                performKeepAlive: function () {
                    called = true;
                    return true;
                }
            };

            var req = {}

            var res = {
                sendStatus: function () {}
            }

            var endpoint = new AuthenticationEndpoint(controller);
            endpoint.handleKeepAlive(req, res);

            assert(called);
        });
        
    })
        
    });
});
