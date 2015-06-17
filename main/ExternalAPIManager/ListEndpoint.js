/*
 * Name: ListEndpoint.js
 * Module: ExternalAPIManager
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
 * v0.05 2015-05-29 Bigarella Chiara  Edit 
 * ================================================================================
 * v0.04 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */

var ExternalAPIController = require('./ExternalAPIController.js');
var ExternalAPIConstructor = require('./ExternalAPIConstructor.js');

module.exports = ListEndpoint;

/**
 * Creates a ListEndpoint.
 * @param {ExternalAPIController} controller
 * @returns {ListEndpoint}
 * @constructor
 */
function ListEndpoint(controller) {
    if (!(this instanceof ListEndpoint)) return new ListEndpoint(controller);
    if (controller) {
        this.controller=controller;
        this.app=controller.getApp();
        var endpoint=this.controller.getEndpoint();
        var listEndpoint=this;
        this.app.get(endpoint + 'list', function(req, res) {listEndpoint.handleRequest(req, res)});
    } else {
        console.error("ERROR: an ExternalAPIController is required.");
        throw("ListEndpoint:requiredExternalAPIController");
    }
}

/**
 * Manages a request to get the chart list
 * @param req
 * @param res
 */
ListEndpoint.prototype.handleRequest = function(req, res) {
    var cookies = {
        getCookies: req.cookies,
        getSignedCookies: req.signedCookies
    };

    if(this.controller.isLogged(cookies)) {
        var charts = this.controller.getCharts();
        var list=[];
        for (var key in charts) {
            var id=charts[key].getId();
            var type=charts[key].getType();
            var settings=charts[key].getSettings();
            var title=settings.title;
            var description= settings.description;
            var object={};
            object.id=id;
            object.type=type;
            object.title=title;
            object.description=description;
            list.push(object);
        }

        res.json(list);
    } else {
        res.sendStatus(401);
    }
};


/* ListEndpointFactory ------------------------------------------------------- */

/**
 * Creates a new ListEndpointFactory.
 * @constructor
 */
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