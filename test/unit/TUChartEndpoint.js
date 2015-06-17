/*
 * Name: TUChartEndpoint.js
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
 * v0.01 2015-05-25 Carlon Chiara Creation
 * ================================================================================
 */

var ChartEndpoint = require('../../main/ExternalAPIManager/ChartEndpoint.js');
var express=require('express');
var http = require('http');


var assert = require("assert");

describe('ChartEndpoint', function(){

    describe('ChartEndpoint(controller: ExternalAPIController)', function(){
        it('should create a new ChartEndpoint object',function(){
            var controller = {
                model: {
                    on: function () {}
                },
                getServer: function () {
                    return {};
                },
                getApp: function () {
                    return {};
                },
                getSecret: function () {
                    return 'afbafbla';
                },
                getEndpoint: function () {return 'endpoint';}
            };

            var endpoint = new ChartEndpoint(controller);
            var expected_endpoint = {
                controller: controller
            };

            assert.equal(JSON.stringify(expected_endpoint), JSON.stringify(endpoint));
        });

        it('should listen to create event', function () {
            var called = false;
            var controller = {
                model: {
                    on: function (event) {
                        if(event === 'create') {
                            called = true;
                        }
                    }
                },
                getServer: function () {
                    return {};
                },
                getApp: function () {
                    return {};
                },
                getSecret: function () {
                    return 'afbafbla';
                },
                getEndpoint: function () {return 'endpoint';}
            };

            var endpoint = new ChartEndpoint(controller);

            assert(called);
        });

    });


});