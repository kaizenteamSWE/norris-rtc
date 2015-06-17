/**
 * Name: ExternalAPIConstructor.js
 * Package: ExternalAPIManager
 * Location: Norris/Main/ExternalAPIManager
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.06 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.05 2015-05-30 Bigarella Chiara  Edit 
 * ================================================================================
 * v0.04 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-12 Bucco Riccardo   Creation
 * ================================================================================
 */

var ExternalAPIController = require('./ExternalAPIController.js');
module.exports = ExternalAPIConstructor;


function ExternalAPIConstructor() {
    if(!(this instanceof ExternalAPIConstructor)) return new ExternalAPIConstructor();
};

ExternalAPIConstructor.prototype.instance=new ExternalAPIConstructor(); // static

ExternalAPIConstructor.prototype.endpoints = []; // endpoits is a static variable

/**
 * Gets the ExternalAPIConstructor's instance.
 * @returns {ExternalAPIConstructor} the factory's instance.
 */
ExternalAPIConstructor.getInstance = function() { // static
    return ExternalAPIConstructor.prototype.instance;
};

/**
 * A static method which registers the endpoints' factories.
 * @param {EndpointFactory} endpoint - the endponint's factory instance.
 */
ExternalAPIConstructor.registerEndpoint = function(endpoint) {
    ExternalAPIConstructor.prototype.endpoints.push(endpoint) /* EXPLICITLY assign to prototype property,
     otherwise it won't act as a static variable */
};

/**
 * Creates an ExternalAPIManager component using the indicated parameters
 * @param {NorrisImpl} model - the Norris' instance;
 * @param {http} server -
 * @param {String} endpoint -
 */
ExternalAPIConstructor.prototype.construct = function (model, server, app) {
    var controller = new ExternalAPIController(model, server, app);
    for (var i=0; i<ExternalAPIConstructor.prototype.endpoints.length; i++) {
        ExternalAPIConstructor.prototype.endpoints[i].createEndpoint(controller);
    }

};

//Dependency injection:
var ChartEndpoint=require('./ChartEndpoint.js');
var AuthenticationEndpoint=require('./AuthenticationEndpoint.js');
var ListEndpoint=require('./ListEndpoint.js');
