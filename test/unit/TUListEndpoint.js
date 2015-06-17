/*
 * Name: TUListEndpoint.js
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

var ListEndpoint = require('../../main/ExternalAPIManager/ListEndpoint.js');
var express=require('express');
var http = require('http');


var assert = require("assert");

describe('ListEndpoint', function(){
    
    describe('ListEndpoint(controller: ExternalAPIController)', function(){
        it('should create a new ListEndpoint object',function(){
            var controller = {
                randomKey1: 'randomValue1',
                getApp: function () {
                    return {
                        get: function () {}
                    };
                },
                getEndpoint: function () {return 'endpoint';}
            };

            var endpoint = new ListEndpoint(controller);
            var expected_endpoint = {
                controller: controller,
                app: controller.getApp()
            };

            assert.equal(JSON.stringify(expected_endpoint), JSON.stringify(endpoint));
        });
        
    });
    
    describe('handleRequest(req: express, res: express)', function() {
        it('should manage a request to get a chart list',function() {
            var controller = {
                getApp: function () {
                    return {
                        get: function () {}
                    };
                },
                getEndpoint: function () {
                    return 'endpoint';
                },
                isLogged: function () {
                    return true;
                },
                getCharts: function () {
                    return [
                        {
                            getId: function () {
                                return 'id1';
                            },
                            getType: function () {
                                return 'type1';
                            },
                            getSettings: function () {
                                return {};
                            }
                        }
                    ];
                },
                model: {

                }
            };

            var called = false;

            var req = {};
            var res = {
                json: function (obj) {
                    called = true;
                }
            };
            
            var endpoint = new ListEndpoint(controller);
            endpoint.handleRequest(req, res);

            assert(called);
        });
        
    });
});
