/*
 * Name: TSChartEndpoint.js
 * Module: 
 * Location: Norris/test/strength
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
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var assert = require("assert");
var ChartEndpoint = require('../../main/ExternalAPIManager/ChartEndpoint.js');

describe('ChartEndpoint',function(){
	describe('ChartEndpoint(controller: ExternalAPIController): void',function(){
		it('should refuse the creation of a ChartEndpoint because it is not indicated an ExternalAPIController as parameter',function(){
			var ExternalAPIConstructor = function() {
				if(!(this instanceof ExternalAPIConstructor)) return new ExternalAPIConstructor();
			};
			ExternalAPIConstructor.prototype.instance=new ExternalAPIConstructor(); // static
			ExternalAPIConstructor.prototype.endpoints = []; // endpoits is a static variable
			ExternalAPIConstructor.registerEndpoint = function(endpoint) {
				ExternalAPIConstructor.prototype.endpoints.push(endpoint) /* EXPLICITLY assign to prototype property,
				 otherwise it won't act as a static variable */
			};
			
			
			var controller;
			
			
			function ChartEndpointFactory() {
				if(!(this instanceof ChartEndpointFactory)) {
					return new ChartEndpointFactory();
				}
			}
			ChartEndpointFactory.prototype.instance=new ChartEndpointFactory(); // static
			ChartEndpointFactory.getInstance = function() { // static
				return ChartEndpointFactory.prototype.instance;
			};
			ChartEndpointFactory.prototype.createEndpoint = function (controller) {
				return new ChartEndpoint (controller);
			};
			ExternalAPIConstructor.registerEndpoint(ChartEndpointFactory.getInstance());
            var chartEndFac = new ChartEndpointFactory();
            
            
			assert.throws(function(){ChartEndpointFactory.getInstance().createEndpoint(controller)});
		});
	});

});
