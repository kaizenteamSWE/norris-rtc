/*
 * Name: TUExternalAPIConstructor.js
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
var ExternalAPIConstructor = require('../../main/ExternalAPIManager/ExternalAPIConstructor.js');

describe('ExternalAPIConstructor',function(){
	describe('registerEndpoint(endpoint: EndpointFactory): void',function(){
		it('should register endpoints factories',function(){
			function EndpointFactory() {
                if(!(this instanceof EndpointFactory)) {
                return new EndpointFactory();
                }
            }

            EndpointFactory.prototype.instance=new EndpointFactory(); // static

            EndpointFactory.getInstance = function() { // static
                return EndpointFactory.prototype.instance;
            };

            EndpointFactory.prototype.createEndpoint = function (controller) {
                return new Endpoint (controller);
            };
            
			var extAPiConstr = new ExternalAPIConstructor();
            ExternalAPIConstructor.registerEndpoint(EndpointFactory.getInstance());
            var index=ExternalAPIConstructor.prototype.endpoints.length - 1;

			assert.deepEqual(EndpointFactory.getInstance(), ExternalAPIConstructor.prototype.endpoints[index]);
		});
	});
	describe('getInstance(): ExternalAPIConstructor',function(){
		it('should return the instance of the factory', function(){
			var extAPiConstr = new ExternalAPIConstructor();
			assert.deepEqual(extAPiConstr.instance, ExternalAPIConstructor.getInstance());
		});
	});
});
