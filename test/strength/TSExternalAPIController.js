/*
 * Name: TSExternalAPIController.js
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
 * v0.02 2015-06-03 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var assert = require("assert");
var ExternalAPIController = require('../../main/ExternalAPIManager/ExternalAPIController.js');

describe('ExternalAPIController',function(){
	describe('ExternalAPIController(model: NorrisImpl, server: http, app: express): void',function(){
		it('should refuse the creation of a ExternalAPIController because it is not indicated an express object as parameter',function(){
			var endpoint = 'randomEndpoint';
			var model = {
				randomKey1: 'randomValue1'
			};
			model.endpoint = endpoint;
			model.getEndpoint = function(){
			    return this.endpoint;
			}
			var server = {
				randomKey2: 'randomValue2'
			};
			
			var app;
			
			assert.throws(function(){new ExternalAPIController(model, server, app)});
		});
	});

});
