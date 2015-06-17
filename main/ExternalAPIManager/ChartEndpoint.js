/*
 * Name: ChartEndpointFactory.js
 * Module: ExternalAPIManager
 * Location: Norris/Main/ExternalAPIManager
 * Date: 2015-04-10
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.06 2015-06-02 Bucco Riccardo   Verify
 * ================================================================================
 * v0.05 2015-05-30 Dal Bianco Davide   Edit 
 * ================================================================================
 * v0.04 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */

var ExternalAPIController = require('./ExternalAPIController.js');
var ExternalAPIConstructor = require('./ExternalAPIConstructor.js');
var SocketIOCookieParser = require('socket.io-cookie-parser');

var socketio = require('socket.io');

module.exports = ChartEndpoint;

/**
 * Creates a ChartEndpoint.
 * @param {ExternalAPIController} controller
 * @returns {ChartEndpoint}
 * @constructor
 */
function ChartEndpoint(controller) {
    if (!(this instanceof ChartEndpoint)) return new ChartEndpoint(controller);
    if (controller) {
        this.controller=controller;
        var sio = socketio(controller.getServer(), {path: this.controller.getEndpoint() + 'chart'}); // the server is listening for socket.io connections
        var chartEndpoint = this;
        sio.use(SocketIOCookieParser(controller.getSecret()));

        this.controller.model.on('create', function (chart) {
            var nsp = sio.of('/' + chart.getId());

            nsp.use(function (socket, next) {
                var cookies = {
                    getCookies: socket.request.cookies,
                    getSignedCookies: socket.request.signedCookies
                };
                if(chartEndpoint.controller.isLogged(cookies)) {
                    next();
                } else {
                    next(new Error('unauthorized'));
                }
            });

            nsp.on('connection', function (socket) {
                socket.emit('chart', chart.getType(), chart.getSettings(), chart.getData());
            });

            chart.on('update', function (updateType, updateData) {
                nsp.emit('update', updateType, updateData);
            });
        });
    } else {
        console.error("ERROR: an ExternalAPIController is required.");
        throw("ChartEndpoint:requiredExternalAPIController");
    }
}


/* ChartEndpointFactory ------------------------------------------------------- */

/**
 * Creates a new ChartEndpointFactory.
 * @constructor
 */
function ChartEndpointFactory() {
    if(!(this instanceof ChartEndpointFactory)) {
        return new ChartEndpointFactory();
    }
}

ChartEndpointFactory.prototype.instance=new ChartEndpointFactory(); // static

/**
 * Gets the ChartEndpointFactory's instance.
 * @returns {ChartEndpointFactory} the factory's instance.
 */
ChartEndpointFactory.getInstance = function() { // static
    return ChartEndpointFactory.prototype.instance;
};

/**
 * Creates a new ChartEndpoint.
 * @param {ExternalAPIController} controller - ;
 * @returns {ChartEndpoint} - the created endpoint.
 */
ChartEndpointFactory.prototype.createEndpoint = function (controller) {
    return new ChartEndpoint (controller);
};

// Dependency injection:
ExternalAPIConstructor.registerEndpoint(ChartEndpointFactory.getInstance());
