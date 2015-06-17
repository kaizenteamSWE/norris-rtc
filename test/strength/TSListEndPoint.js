/*
 * Name: TSListEndpoint.js
 * Module: 
 * Location: Norris/test/strength
 * Date: 2015-05-30
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
 * v0.01 2015-05-30 Carlon Chiara Creation
 * ================================================================================
 */

var assert = require("assert");
var ListEndpoint = require('../../main/ExternalAPIManager/ListEndpoint.js');


describe('ListEndpoint',function(){
	describe('ListEndpoint(controller: ExternalAPIController): ListEndpoint',function(){
		it('should refuse the creation of a ListEndpoint because it is not passed an ExternalAPIController as parameter',function(){
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
			
			
			function ListEndpointFactory() {
			    if(!(this instanceof ListEndpointFactory)) {
			        return new ListEndpointFactory();
			    }
			}

			ListEndpointFactory.prototype.instance=new ListEndpointFactory(); // static

			/**
			 * Gets the ListEndpointFactory's instance.
			 * @returns {ListEndpointFactory} the factory's instance.
			 */
			ListEndpointFactory.getInstance = function() { // static
			    return ListEndpointFactory.prototype.instance;
			};

			/**
			 * Creates a new ListEndpoint.
			 * @param {ExternalAPIController} controller - ;
			 * @returns {ListEndpoint} - the created endpoint.
			 */
			ListEndpointFactory.prototype.createEndpoint = function (controller) {
			    return new ListEndpoint (controller);
			};

			// Dependency injection:
			ExternalAPIConstructor.registerEndpoint(ListEndpointFactory.getInstance());
			            
			assert.throws(function () {(ListEndpointFactory.getInstance().createEndpoint(controller))});
		});
	});
});
