/*
 * Name: TSAuthenticationEndpoint.js
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
var AuthenticationEndpoint = require('../../main/ExternalAPIManager/AuthenticationEndpoint.js');

describe('AuthenticationEndpoint',function(){
	describe('AuthenticationEndpoint(controller: ExternalAPIController): void',function(){
		it('should refuse the creation of a AuthenticationEndpoint because it is not indicated an ExternalAPIController as parameter',function(){
			
			var ExternalAPIConstructor = function() {
				if(!(this instanceof ExternalAPIConstructor)) return new ExternalAPIConstructor();
			};
			ExternalAPIConstructor.prototype.instance=new ExternalAPIConstructor(); 
			ExternalAPIConstructor.prototype.endpoints = []; 
			ExternalAPIConstructor.registerEndpoint = function(endpoint) {
				ExternalAPIConstructor.prototype.endpoints.push(endpoint) 
			};
			
			
			var controller;
			
			function AuthenticationEndpointFactory() {
				if(!(this instanceof AuthenticationEndpointFactory)) {
					return new AuthenticationEndpointFactory();
				}
			}
			AuthenticationEndpointFactory.prototype.instance=new AuthenticationEndpointFactory(); 
			AuthenticationEndpointFactory.getInstance = function() { 
				return AuthenticationEndpointFactory.prototype.instance;
			};
			AuthenticationEndpointFactory.prototype.createEndpoint = function (controller) {
				return new AuthenticationEndpoint (controller);
			};
			ExternalAPIConstructor.registerEndpoint(AuthenticationEndpointFactory.getInstance());
            var chartEndFac = new AuthenticationEndpointFactory();
            
            
			assert.throws(function(){AuthenticationEndpointFactory.getInstance().createEndpoint(controller)});
		});
	});

});
