/*
 * Name: AuthenticationEndpoint.js
 * Module: ExternalAPIManager
 * Location: Norris/Main/ExternalAPIManager
 * Date: 2015-05-24
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
 * v0.05 2015-05-29 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.04 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */

var ExternalAPIController = require('./ExternalAPIController.js');
var ExternalAPIConstructor = require('./ExternalAPIConstructor.js');

module.exports = AuthenticationEndpoint;

/**
 * Creates an AuthenticationEndpoint.
 * @param {ExternalAPIController} controller
 * @returns {AuthenticationEndpoint}
 * @constructor
 */
function AuthenticationEndpoint(controller) {
    if (!(this instanceof AuthenticationEndpoint)) return new AuthenticationEndpoint(controller);
    if (controller) {
        var authenticationEndpoint = this;
        this.controller = controller;
        this.app = controller.getApp();
        this.app.post(this.controller.getEndpoint() + 'auth/login', function (req, res) {authenticationEndpoint.handleLogin(req, res);});
        this.app.post(this.controller.getEndpoint() + 'auth/logout', function (req, res) {authenticationEndpoint.handleLogout(req, res);});
        this.app.post(this.controller.getEndpoint() + 'auth/keepalive', function (req, res) {authenticationEndpoint.handleKeepAlive(req, res);});
    } else {
        console.error("ERROR: an ExternalAPIController is required.");
        throw("AuthenticationEndpoint:requiredExternalAPIController");
    }
}

/**
 * Manages an authentication request
 * @param {express::request} req
 * @param {express::response} res
 */
AuthenticationEndpoint.prototype.handleLogin = function(req, res) {
    var cookies = {
        getCookies: req.cookies,
        getSignedCookies: req.signedCookies,
        setCookie: function () {
            res.cookie.apply(res, arguments);
        },
        clearCookie: function () {
            res.clearCookie.apply(res, arguments);
        }
    };

    if(!req.body.username || !req.body.password) {
        res.sendStatus(400);
    } else if(!this.controller.performLogin(cookies, req.body.username, req.body.password)) {
        res.sendStatus(401);
    } else
        res.sendStatus(200);
};

/**
 * Manages an end-session request
 * @param {express::request} req
 * @param {express::response} res
 */
AuthenticationEndpoint.prototype.handleLogout = function(req, res) {
    var cookies = {
        getCookies: req.cookies,
        getSignedCookies: req.signedCookies,
        setCookie: function () {
            res.cookie.apply(res, arguments);
        },
        clearCookie: function () {
            res.clearCookie.apply(res, arguments);
        }
    };
    if(!this.controller.performLogout(cookies))
        res.sendStatus(401);
    else
        res.sendStatus(200);
};

/**
 * Manages a request in order to renew an activated session
 * @param {express::request} req
 * @param {express::response} res
 */
AuthenticationEndpoint.prototype.handleKeepAlive = function(req, res) {
    var cookies = {
        getCookies: req.cookies,
        getSignedCookies: req.signedCookies,
        setCookie: function () {
            res.cookie.apply(res, arguments);
        },
        clearCookie: function () {
            res.clearCookie.apply(res, arguments);
        }
    };
    if(!this.controller.performKeepAlive(cookies))
        res.sendStatus(401);
    else
        res.sendStatus(200);
};



/* AuthenticationEndpointFactory ------------------------------------------------------- */

/**
 * Creates a new AuthenticationEndpointFactory.
 * @constructor
 */
function AuthenticationEndpointFactory() {
    if(!(this instanceof AuthenticationEndpointFactory)) {
        return new AuthenticationEndpointFactory();
    }
}

AuthenticationEndpointFactory.prototype.instance=new AuthenticationEndpointFactory(); // static

/**
 * Gets the AuthenticationEndpointFactory's instance.
 * @returns {AuthenticationEndpointFactory} the factory's instance.
 */
AuthenticationEndpointFactory.getInstance = function() { // static
    return AuthenticationEndpointFactory.prototype.instance;
};

/**
 * Creates a new AuthenticationEndpoint.
 * @param {ExternalAPIController} controller - ;
 * @returns {AuthenticationEndpoint} - the created endpoint.
 */
AuthenticationEndpointFactory.prototype.createEndpoint = function (controller) {
    return new AuthenticationEndpoint (controller);
};

// Dependency injection:
ExternalAPIConstructor.registerEndpoint(AuthenticationEndpointFactory.getInstance());
